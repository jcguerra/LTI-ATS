import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { errorHandler } from '@shared/middlewares/error-handler';
import { responseFormatter } from '@shared/middlewares/response-formatter';
import { AppDataSource } from '@infrastructure/database/data-source';

// Cargar variables de entorno
dotenv.config();

class Application {
  private app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000');
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Seguridad
    this.app.use(helmet());
    
    // CORS
    this.app.use(cors({
      origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3001'],
      credentials: true
    }));

    // Parser de JSON
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));

    // Middleware de formateo de respuestas
    this.app.use(responseFormatter);
  }

  private initializeRoutes(): void {
    // Ruta de health check
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      });
    });

    // Rutas de la API
    this.app.use('/api/v1', (req, res) => {
      res.json({ message: 'LTI ATS API v1.0 - Rutas por implementar' });
    });

    // Ruta 404
    this.app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        message: 'Endpoint no encontrado',
        error: {
          code: 'NOT_FOUND',
          message: `Ruta ${req.originalUrl} no existe`
        }
      });
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    try {
      // Inicializar base de datos
      console.log('🔄 Inicializando conexión a la base de datos...');
      // await AppDataSource.initialize();
      console.log('✅ Conexión a la base de datos establecida');

      // Iniciar servidor
      this.app.listen(this.port, () => {
        console.log(`🚀 Servidor LTI ATS corriendo en http://localhost:${this.port}`);
        console.log(`📝 Documentación disponible en http://localhost:${this.port}/api/docs`);
        console.log(`💾 Entorno: ${process.env.NODE_ENV || 'development'}`);
      });
    } catch (error) {
      console.error('❌ Error al inicializar la aplicación:', error);
      process.exit(1);
    }
  }
}

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Inicializar aplicación
const app = new Application();
app.start(); 