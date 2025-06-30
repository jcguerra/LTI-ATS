export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly code: string;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    isOperational: boolean = true
  ) {
    super(message);
    
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    
    // Mantener el stack trace correcto
    Error.captureStackTrace(this, this.constructor);
  }

  // Factory methods para errores comunes
  public static badRequest(message: string, code: string = 'BAD_REQUEST'): AppError {
    return new AppError(message, 400, code);
  }

  public static unauthorized(message: string = 'No autorizado', code: string = 'UNAUTHORIZED'): AppError {
    return new AppError(message, 401, code);
  }

  public static forbidden(message: string = 'Acceso prohibido', code: string = 'FORBIDDEN'): AppError {
    return new AppError(message, 403, code);
  }

  public static notFound(message: string = 'Recurso no encontrado', code: string = 'NOT_FOUND'): AppError {
    return new AppError(message, 404, code);
  }

  public static conflict(message: string, code: string = 'CONFLICT'): AppError {
    return new AppError(message, 409, code);
  }

  public static validation(message: string, code: string = 'VALIDATION_ERROR'): AppError {
    return new AppError(message, 422, code);
  }

  public static internal(message: string = 'Error interno del servidor', code: string = 'INTERNAL_ERROR'): AppError {
    return new AppError(message, 500, code, false);
  }

  // Método para serializar el error
  public toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      code: this.code,
      isOperational: this.isOperational,
      stack: this.stack
    };
  }
} 