# =============================================
# STAGE 1: Build Stage
# =============================================
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma/ ./prisma/

# Instalar todas las dependencias (incluidas dev dependencies)
RUN npm ci --only=production=false

# Copiar código fuente
COPY src/ ./src/

# Generar cliente de Prisma
RUN npx prisma generate

# Compilar TypeScript a JavaScript
RUN npm run build

# =============================================
# STAGE 2: Production Stage
# =============================================
FROM node:18-alpine AS production

# Instalar dumb-init para manejo correcto de señales
RUN apk add --no-cache dumb-init

# Crear usuario no-root por seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S backend -u 1001

# Establecer directorio de trabajo
WORKDIR /app

# Crear directorio para uploads y cambiar ownership del directorio
RUN mkdir -p uploads && chown -R backend:nodejs /app

# Cambiar al usuario no-root
USER backend

# Copiar archivos de configuración
COPY --chown=backend:nodejs package*.json ./
COPY --chown=backend:nodejs prisma/ ./prisma/

# Instalar solo dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Copiar código compilado desde builder stage
COPY --from=builder --chown=backend:nodejs /app/dist ./dist
COPY --from=builder --chown=backend:nodejs /app/node_modules/.prisma ./node_modules/.prisma

# Exponer puerto
EXPOSE 3000

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Ejecutar aplicación con dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"] 