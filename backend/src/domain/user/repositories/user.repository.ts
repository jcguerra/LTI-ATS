import { User } from '../entities/user.entity';

export interface UserRepository {
  // Create
  create(user: User): Promise<User>;
  
  // Read
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(filters?: UserFilters): Promise<User[]>;
  findManyByIds(ids: string[]): Promise<User[]>;
  
  // Update
  update(user: User): Promise<User>;
  
  // Delete
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;
  
  // Utility
  exists(email: string): Promise<boolean>;
  count(filters?: UserFilters): Promise<number>;
}

export interface UserFilters {
  email?: string;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAfter?: Date;
  createdBefore?: Date;
  search?: string; // Búsqueda general en nombre y email
} 