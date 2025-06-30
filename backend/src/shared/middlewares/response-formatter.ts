import { Request, Response, NextFunction } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export const responseFormatter = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Método para respuestas exitosas
  res.success = (data?: any, message?: string, statusCode: number = 200) => {
    const response: ApiResponse = {
      success: true,
      message,
      data
    };
    res.status(statusCode).json(response);
  };

  // Método para respuestas de error
  res.error = (
    message: string,
    code: string = 'GENERIC_ERROR',
    statusCode: number = 400,
    data?: any
  ) => {
    const response: ApiResponse = {
      success: false,
      message,
      error: {
        code,
        message
      },
      ...(data && { data })
    };
    res.status(statusCode).json(response);
  };

  next();
};

// Extender el tipo Response para incluir nuestros métodos personalizados
declare global {
  namespace Express {
    interface Response {
      success(data?: any, message?: string, statusCode?: number): void;
      error(message: string, code?: string, statusCode?: number, data?: any): void;
    }
  }
} 