# LTI ATS - Backend

Backend del sistema de seguimiento de talento (ATS) desarrollado en Node.js con TypeScript, siguiendo arquitectura DDD (Domain Driven Design).

## Tecnologías Utilizadas

- **Node.js** + **Express.js**
- **TypeScript**
- **Prisma ORM** + **PostgreSQL**
- **JWT** para autenticación
- **bcryptjs** para hash de contraseñas
- **multer** para manejo de archivos
- **zod** para validación de datos
- **Jest** para testing

## Estructura del Proyecto

El proyecto sigue arquitectura DDD (Domain Driven Design):

```
src/
├── domain/                 # Lógica de negocio
│   └── user/
│       ├── entities/       # Entidades del dominio
│       ├── repositories/   # Interfaces de repositorios
│       ├── services/       # Servicios de dominio
│       └── value-objects/  # Objetos de valor
├── application/            # Casos de uso
│   └── use-cases/
├── infrastructure/         # Implementaciones técnicas
│   ├── database/
│   ├── auth/
│   └── file-storage/
├── interfaces/             # Adaptadores de entrada
│   ├── http/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   └── routes/
│   └── validators/
└── shared/                 # Utilidades compartidas
    ├── exceptions/
    ├── middlewares/
    ├── responses/
    └── utils/
```

## Arquitectura Docker

El proyecto incluye configuración completa de Docker para desarrollo y producción:

### Servicios Disponibles

| Servicio | Puerto | Descripción | Desarrollo | Producción |
|----------|--------|-------------|------------|------------|
| **API Backend** | 3000 | Aplicación Node.js | ✅ Hot reload | ✅ Optimizado |
| **PostgreSQL** | 5432 | Base de datos principal | ✅ | ✅ |
| **pgAdmin** | 8080 | Interfaz web para DB | ✅ | ✅ |
| **MailPit** | 8025/1025 | Email testing | ✅ | ✅ |
| **MinIO** | 9000/9001 | S3-compatible storage | ❌ | ✅ |
| **Redis** | 6379 | Cache y sesiones | ❌ | ✅ |

### Archivos Docker

- `Dockerfile` - Imagen optimizada para producción (multi-stage)
- `Dockerfile.dev` - Imagen para desarrollo con herramientas adicionales  
- `docker-compose.yml` - Servicios completos para producción
- `docker-compose.dev.yml` - Servicios para desarrollo con hot reload
- `.dockerignore` - Archivos excluidos del build
- `.gitignore` - Archivos excluidos del control de versiones

## Configuración Inicial

### Opción 1: Desarrollo Local

#### 1. Instalar dependencias
```bash
npm install
```

#### 2. Configurar variables de entorno
Copiar el archivo `.env.example` y renombrarlo a `.env`:
```bash
cp .env.example .env
```

Configurar las variables necesarias en el archivo `.env`:
- Base de datos PostgreSQL
- JWT secrets
- Configuración de archivos
- CORS settings

#### 3. Configurar base de datos
```bash
# Generar cliente de Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate

# (Opcional) Abrir Prisma Studio
npm run prisma:studio
```

### Opción 2: Desarrollo con Docker

#### 1. Iniciar entorno completo de desarrollo
```bash
# Inicia todos los servicios (API, DB, pgAdmin, MailPit)
npm run docker:dev:build

# Ver logs en tiempo real
npm run docker:dev:logs
```

#### 2. Servicios disponibles
- **API Backend**: http://localhost:3000
- **Base de datos**: Puerto 5432
- **pgAdmin**: http://localhost:8080 (admin@lti-ats.com / admin123)
- **MailPit**: http://localhost:8025 (email testing)

#### 3. Comandos útiles
```bash
# Detener servicios
npm run docker:dev:down

# Reiniciar con cambios
npm run docker:dev:build

# Acceder al container de la API
docker exec -it lti-ats-api-dev sh
```

### Opción 3: Producción con Docker

#### 1. Configurar variables de producción
```bash
cp .env.production.example .env.production
# Editar .env.production con valores reales
```

#### 2. Iniciar servicios de producción
```bash
# Inicia todos los servicios en modo producción
npm run docker:up:build

# Ver logs
npm run docker:logs
```

#### 3. Servicios en producción
- **API Backend**: http://localhost:3000
- **PostgreSQL**: Puerto 5432
- **pgAdmin**: http://localhost:8080
- **MinIO**: http://localhost:9001 (console), Puerto 9000 (API)
- **MailPit**: http://localhost:8025
- **Redis**: Puerto 6379

## Scripts Disponibles

```bash
# Desarrollo local
npm run dev              # Inicia servidor en modo desarrollo con nodemon

# Construcción
npm run build           # Compila TypeScript a JavaScript
npm start              # Inicia servidor de producción

# Base de datos
npm run prisma:generate # Genera cliente de Prisma
npm run prisma:migrate  # Ejecuta migraciones
npm run prisma:studio   # Abre interfaz gráfica de DB

# Testing
npm test               # Ejecuta tests
npm run test:watch     # Ejecuta tests en modo watch
npm run test:coverage  # Ejecuta tests con coverage

# Calidad de código
npm run lint           # Ejecuta ESLint
npm run format         # Formatea código con Prettier

# Docker - Producción
npm run docker:build    # Construye imagen Docker
npm run docker:run      # Ejecuta container individual
npm run docker:up       # Inicia todos los servicios
npm run docker:up:build # Inicia servicios reconstruyendo
npm run docker:down     # Detiene todos los servicios
npm run docker:logs     # Ve logs de todos los servicios

# Docker - Desarrollo
npm run docker:dev       # Inicia entorno de desarrollo
npm run docker:dev:build # Inicia desarrollo reconstruyendo
npm run docker:dev:down  # Detiene entorno de desarrollo
npm run docker:dev:logs  # Ve logs del servicio de desarrollo
```

## Endpoints de la API

### Health Check
- `GET /health` - Estado del servidor

### Autenticación (por implementar)
- `POST /api/v1/auth/register` - Registro de usuario
- `POST /api/v1/auth/login` - Inicio de sesión
- `POST /api/v1/auth/refresh` - Renovar token
- `POST /api/v1/auth/logout` - Cerrar sesión

### Usuarios (por implementar)
- `GET /api/v1/users` - Listar usuarios
- `GET /api/v1/users/:id` - Obtener usuario
- `PUT /api/v1/users/:id` - Actualizar usuario
- `DELETE /api/v1/users/:id` - Eliminar usuario

## Principios de Arquitectura

### SOLID
- **S**ingle Responsibility: Cada clase tiene una responsabilidad específica
- **O**pen/Closed: Abierto para extensión, cerrado para modificación
- **L**iskov Substitution: Las implementaciones pueden sustituirse
- **I**nterface Segregation: Interfaces específicas y pequeñas
- **D**ependency Inversion: Dependemos de abstracciones, no de concreciones

### DDD (Domain Driven Design)
- **Entities**: Objetos con identidad única
- **Value Objects**: Objetos inmutables definidos por sus atributos
- **Repositories**: Abstracción para acceso a datos
- **Use Cases**: Casos de uso específicos de la aplicación
- **Services**: Lógica de dominio que no pertenece a entidades

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NODE_ENV` | Entorno de ejecución | `development` |
| `PORT` | Puerto del servidor | `3000` |
| `DATABASE_URL` | URL de conexión a PostgreSQL | Ver `.env.example` |
| `JWT_SECRET` | Secreto para JWT | `your-secret-key` |
| `JWT_ACCESS_EXPIRY` | Tiempo de vida del access token | `15m` |
| `JWT_REFRESH_EXPIRY` | Tiempo de vida del refresh token | `7d` |

## Control de Versiones

### Archivos Ignorados

El proyecto incluye configuración completa de `.gitignore` para:

**🔐 Archivos sensibles (NUNCA commitear):**
- `.env*` - Variables de entorno con credenciales
- `*.key`, `*.cert`, `*.pem` - Certificados y claves
- `config/secrets.json` - Configuraciones sensibles

**📦 Dependencias y builds:**
- `node_modules/` - Dependencias de npm
- `dist/`, `build/` - Código compilado
- `*.tsbuildinfo` - Cache de TypeScript

**📁 Archivos del usuario:**
- `uploads/` - Archivos subidos por usuarios
- `logs/` - Archivos de log
- `coverage/` - Reportes de coverage

**🐳 Docker:**
- `postgres-data/`, `redis-data/` - Volúmenes de datos
- `docker-compose.override.yml` - Overrides locales

### Recomendaciones

1. **Nunca commitear archivos `.env`** - Usar `.env.example` como plantilla
2. **Revisar antes de commit** - Verificar que no se incluyan archivos sensibles
3. **Usar `.env.example`** - Mantener actualizado con nuevas variables

## Próximos Pasos

1. ✅ Estructura básica creada
2. ✅ Configurar Docker y Docker Compose
3. ⏳ Implementar autenticación JWT
4. ⏳ Crear controladores y rutas
5. ⏳ Implementar repositorios con Prisma
6. ⏳ Agregar validaciones con Zod
7. ⏳ Configurar tests unitarios
8. ⏳ Documentación con Swagger
9. ⏳ CI/CD con GitHub Actions

## Contacto

Para dudas o sugerencias sobre el backend, contactar al equipo de desarrollo. 