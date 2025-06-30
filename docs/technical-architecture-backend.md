# Arquitectura Técnica – Backend del Proyecto LTI

## Resumen General
- **Nombre del sistema**: LTI (basado en ATS)
- **Tipo de backend**: RESTful API
- **Tecnologías principales**:
  - Node.js + Express
  - TypeScript
  - Prisma ORM
  - PostgreSQL
  - JWT (access + refresh tokens)
  - Docker + Docker Compose
  - Arquitectura DDD
- **Otras características clave**:
  - Aplicación de principios SOLID y OOP
  - Servicios desacoplados y middlewares reutilizables
  - Manejo robusto de excepciones
  - Estandarización de respuestas
  - Gestión de roles y permisos
  - Manejo de archivos (documentos y multimedia)
  - Testing con Jest
  - Clean Code
  - Frontend desacoplado (no SSR, sin multitenancy)

## Estructura del Backend (basada en DDD + modularidad)
El backend va estar dentro de una carpeta llamada "backend" en el directorio raiz del proyecto.
```
/src
  /domain
    /user
      entities/
      repositories/
      value-objects/
      services/
  /application
    /use-cases
      create-user.usecase.ts
      get-user.usecase.ts
  /infrastructure
    /database
      prisma/
      repositories/
    /auth
    /file-storage
  /interfaces
    /http
      /controllers
      /middlewares
      /routes
    /validators
  /shared
    /utils
    /exceptions
    /responses
    /middlewares
main.ts
```

## Principios aplicados
- **SOLID**:	Single Responsibility por capa (domain, app, infra, interface)
- **OOP**:	Value Objects, Entity pattern, servicios inyectables
- **DDD**:	Separación por dominios y casos de uso claros
- **Clean Code**:	Código legible, nombrado claro, sin lógica duplicada
- **DRY + KISS**:	Utilidades y middlewares reutilizables, sin over-engineering

## Autenticación y Roles
- JWT tokens
  - Access token: válido por 15 mins
  - Refresh token: válido por 7 días
- Middleware de autenticación
- Middleware de autorización por rol y/o permiso
- Tabla roles y permissions, relación con usuarios
- Ejemplo de endpoint protegido:
```
router.get('/admin/dashboard', authMiddleware, hasRole('admin'), controller)
```

## Gestión de archivos
- Archivos admitidos:
  - .pdf, .docx (documentos)
  - .mp4, .mp3, .jpg, .png (multimedia)
- Opciones de almacenamiento:
  - Local: /uploads (para desarrollo)
  - Producción: S3, Wasabi o similar
- Librerías sugeridas:
  - multer (para carga)
  - sharp (procesamiento de imágenes si aplica)
  - ffmpeg (procesamiento de video/audio si necesario)


## Base de datos – PostgreSQL + Prisma
- Prisma con enfoque "schema-first"
- Modelo relacional con migraciones controladas
- Soft deletes y timestamps (createdAt, updatedAt, deletedAt)
- Relaciones claras entre entidades:
  - users, roles, permissions, candidates, jobs, applications, files, etc.


## Testing
- Jest para unit e integration tests
- Testear:
  - Casos de uso
  - Servicios de dominio
  - Rutas protegidas
  - Uploads
- Cobertura mínima sugerida: 70%

## Docker y Docker Compose
**Dockerfile**:
- Stage de build y de producción
- Variables desde .env.production
**docker-compose.yml**:
- Servicios: api, db, pgadmin, minio, mailpit.
- Volúmenes para persistencia

## Gestión de configuración y errores
- .env y dotenv para entorno
- Envoltura global de errores (errorHandler)
- Estandarización de respuestas:
```
{
  success: boolean,
  message?: string,
  data?: any,
  error?: { code: string, message: string }
}
```

## Escalabilidad y buenas prácticas
- Modularización por dominio
- Separación de infraestructura (prisma, auth, storage)
- Repositorios como interfaces inyectables
- Servicios desacoplados de Express
- Validación con zod o class-validator
- Soporte para swagger o postman.json generado

