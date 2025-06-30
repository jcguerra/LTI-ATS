import { AppError } from '../../../shared/exceptions/app-error';

export class Email {
  private constructor(private readonly value: string) {
    this.validate();
  }

  public static create(email: string): Email {
    return new Email(email.toLowerCase().trim());
  }

  private validate(): void {
    if (!this.value) {
      throw new AppError('Email es requerido', 400, 'INVALID_EMAIL');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
      throw new AppError('Formato de email inválido', 400, 'INVALID_EMAIL_FORMAT');
    }

    if (this.value.length > 255) {
      throw new AppError('Email demasiado largo', 400, 'EMAIL_TOO_LONG');
    }
  }

  public getValue(): string {
    return this.value;
  }

  public getDomain(): string {
    return this.value.split('@')[1];
  }

  public getLocalPart(): string {
    return this.value.split('@')[0];
  }

  public equals(other: Email): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
} 