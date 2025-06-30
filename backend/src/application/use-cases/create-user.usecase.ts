import { User } from '@domain/user/entities/user.entity';
import { UserRepository } from '@domain/user/repositories/user.repository';
import { Email } from '@domain/user/value-objects/email.vo';
import { AppError } from '@shared/exceptions/app-error';
import bcrypt from 'bcryptjs';

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
}

export interface CreateUserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptRounds: number = 10
  ) {}

  public async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    // Validar email
    const email = Email.create(request.email);
    
    // Verificar que el email no esté en uso
    const existingUser = await this.userRepository.findByEmail(email.getValue());
    if (existingUser) {
      throw AppError.conflict('El email ya está registrado', 'EMAIL_ALREADY_EXISTS');
    }

    // Validar contraseña
    this.validatePassword(request.password);

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(request.password, this.bcryptRounds);

    // Crear usuario
    const user = User.create({
      email: email.getValue(),
      password: hashedPassword,
      firstName: request.firstName.trim(),
      lastName: request.lastName.trim(),
      phone: request.phone?.trim(),
      avatar: request.avatar,
      isActive: true,
    });

    // Persistir usuario
    const savedUser = await this.userRepository.create(user);

    // Retornar respuesta pública (sin contraseña)
    return savedUser.toPublic();
  }

  private validatePassword(password: string): void {
    if (!password) {
      throw AppError.badRequest('Contraseña es requerida', 'PASSWORD_REQUIRED');
    }

    if (password.length < 8) {
      throw AppError.badRequest('Contraseña debe tener al menos 8 caracteres', 'PASSWORD_TOO_SHORT');
    }

    if (password.length > 100) {
      throw AppError.badRequest('Contraseña demasiado larga', 'PASSWORD_TOO_LONG');
    }

    // Validar que tenga al menos una letra y un número
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    if (!hasLetter || !hasNumber) {
      throw AppError.badRequest(
        'Contraseña debe contener al menos una letra y un número',
        'PASSWORD_WEAK'
      );
    }
  }
} 