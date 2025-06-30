# Frontend LTI ATS - Sistema de Seguimiento de Talento

## 📋 Descripción

Frontend del sistema LTI ATS (Applicant Tracking System) desarrollado con React, TypeScript y Material-UI. Proporciona una interfaz moderna e intuitiva para la gestión de candidatos, vacantes, aplicaciones y entrevistas.

## 🚀 Tecnologías Principales

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Material-UI (MUI) v6** - Componentes de UI
- **Redux Toolkit** - Gestión de estado
- **React Router DOM v7** - Enrutamiento
- **i18next** - Internacionalización (ES/EN)
- **Axios** - Cliente HTTP
- **React Dropzone** - Carga de archivos
- **Vite** - Build tool y desarrollo
- **Vitest** - Testing framework
- **ESLint + Prettier** - Linting y formateo

## 📁 Estructura del Proyecto

```
frontend/
├── public/                     # Archivos estáticos
├── src/
│   ├── auth/                   # Módulo de autenticación
│   │   └── LoginPage.tsx
│   ├── dashboard/              # Panel principal
│   │   └── DashboardPage.tsx
│   ├── candidates/             # Gestión de candidatos
│   │   └── CandidatesListPage.tsx
│   ├── jobs/                   # Gestión de vacantes
│   │   └── JobsListPage.tsx
│   ├── applications/           # Gestión de aplicaciones
│   │   └── ApplicationsListPage.tsx
│   ├── interviews/             # Gestión de entrevistas
│   │   └── InterviewsListPage.tsx
│   ├── recruiters/             # Gestión de reclutadores
│   │   └── RecruitersListPage.tsx
│   ├── admin/                  # Panel de administración
│   │   └── AdminDashboardPage.tsx
│   ├── settings/               # Configuración
│   │   └── SettingsPage.tsx
│   ├── profile/                # Perfil de usuario
│   │   └── ProfilePage.tsx
│   ├── shared/                 # Recursos compartidos
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── NotFound.tsx
│   │   ├── hooks/              # Hooks personalizados
│   │   │   └── redux.ts
│   │   ├── i18n/               # Internacionalización
│   │   │   ├── index.ts
│   │   │   └── locales/
│   │   │       ├── es.json
│   │   │       └── en.json
│   │   ├── theme/              # Configuración de tema
│   │   │   └── index.ts
│   │   ├── layout/             # Layouts de la aplicación
│   │   │   ├── RootLayout.tsx
│   │   │   └── AuthLayout.tsx
│   │   ├── services/           # Servicios de API
│   │   ├── utils/              # Utilidades
│   │   └── store/              # Estado global (Redux)
│   │       ├── index.ts
│   │       └── slices/
│   │           ├── authSlice.ts
│   │           └── uiSlice.ts
│   ├── routes/                 # Configuración de rutas
│   │   ├── index.tsx
│   │   ├── PrivateRoute.tsx
│   │   └── PublicRoute.tsx
│   ├── test/                   # Configuración de testing
│   │   └── setup.ts
│   ├── App.tsx                 # Componente principal
│   └── main.tsx               # Punto de entrada
├── .env.example               # Variables de entorno de ejemplo
├── .eslintrc.cjs             # Configuración ESLint
├── .prettierrc               # Configuración Prettier
├── tsconfig.json             # Configuración TypeScript
├── vite.config.ts            # Configuración Vite
└── package.json              # Dependencias y scripts
```

## ⚙️ Configuración y Desarrollo

### Prerequisitos

- Node.js 18+ 
- npm 9+

### Instalación

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

### Variables de Entorno

```env
# API Backend
VITE_API_URL=http://localhost:3000/api/v1
VITE_API_TIMEOUT=10000

# Configuración de la App
VITE_APP_NAME=LTI ATS
VITE_DEFAULT_LANGUAGE=es
VITE_DEFAULT_THEME=light

# Autenticación
VITE_AUTH_TOKEN_KEY=lti_access_token
VITE_AUTH_REFRESH_KEY=lti_refresh_token

# Desarrollo
VITE_ENABLE_REDUX_DEVTOOLS=true
VITE_ENABLE_LOGGING=true
```

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev                    # Servidor de desarrollo (puerto 3001)
npm run preview               # Preview del build

# Build y producción
npm run build                 # Build para producción
npm run typecheck             # Verificación de tipos

# Testing
npm run test                  # Ejecutar tests
npm run test:ui              # Tests con interfaz visual
npm run test:coverage        # Coverage de tests

# Linting y formateo
npm run lint                  # Ejecutar ESLint
npm run lint:fix             # Corregir errores de ESLint
npm run format               # Formatear código con Prettier
npm run format:check         # Verificar formato del código
```

## 🎨 Características de UI/UX

### Tema y Diseño

- **Material Design 3** con componentes MUI v6
- **Modo oscuro/claro** con persistencia en localStorage
- **Responsive design** para móviles, tablets y desktop
- **Tipografía Inter** para mejor legibilidad

### Internacionalización

- **Soporte multiidioma**: Español e Inglés
- **Detección automática** del idioma del navegador
- **Cambio dinámico** de idioma sin recarga
- **Traducciones completas** para todos los módulos

### Navegación

- **Rutas protegidas** por autenticación y roles
- **Lazy loading** de componentes para mejor rendimiento
- **Breadcrumbs** y navegación contextual
- **Sidebar colapsible** para optimizar espacio

## 🔐 Autenticación y Autorización

### Sistema de Autenticación

- **JWT Tokens** con refresh automático
- **Roles y permisos** granulares
- **Rutas protegidas** por rol (Admin, Reclutador, Candidato)
- **Persistencia de sesión** entre reinicios

### Gestión de Estado

```typescript
// Estado de autenticación
interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// Estado de UI
interface UIState {
  theme: 'light' | 'dark'
  language: 'es' | 'en'
  sidebarOpen: boolean
  loading: boolean
  notifications: NotificationState[]
  pageTitle: string
}
```

## 🧪 Testing

### Configuración de Testing

- **Vitest** como runner de tests
- **Testing Library** para tests de componentes
- **jsdom** para simulación del DOM
- **Mocks automáticos** para APIs y servicios

### Ejecutar Tests

```bash
# Tests en modo watch
npm run test

# Tests con UI visual
npm run test:ui

# Coverage completo
npm run test:coverage
```

## 📱 Responsive Design

### Breakpoints

- **xs**: 0px - 599px (móviles)
- **sm**: 600px - 899px (tablets)
- **md**: 900px - 1199px (laptops)
- **lg**: 1200px - 1535px (desktop)
- **xl**: 1536px+ (pantallas grandes)

### Optimizaciones

- **Lazy loading** de rutas y componentes
- **Code splitting** automático
- **Optimización de imágenes** con sharp
- **Bundle analysis** incluido

## 🔧 Configuración Avanzada

### Alias de Rutas (TypeScript)

```typescript
// Configurados en tsconfig.json y vite.config.ts
import Component from '@/components/Component'
import { useAuth } from '@/hooks/auth'
import { api } from '@/services/api'
import theme from '@/theme'
```

### ESLint + Prettier

- **Configuración estricta** para calidad de código
- **Hooks pre-commit** con Husky
- **Auto-formateo** en save con lint-staged
- **Reglas específicas** para React y TypeScript

## 🚀 Deploy y Producción

### Build para Producción

```bash
# Generar build optimizado
npm run build

# Verificar build localmente
npm run preview
```

### Optimizaciones de Build

- **Tree shaking** automático
- **Minificación** de código y CSS
- **Separación de chunks** por vendor
- **Source maps** para debugging

## 🔗 Integración con Backend

### Configuración de API

- **Proxy automático** para desarrollo
- **Interceptores Axios** para autenticación
- **Manejo de errores** centralizado
- **Retry automático** en fallos de red

### Endpoints Principales

```typescript
// Configuración base
const API_BASE_URL = import.meta.env.VITE_API_URL
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT

// Servicios disponibles
- AuthService      // Autenticación
- CandidatesService // Gestión de candidatos
- JobsService      // Gestión de vacantes
- ApplicationsService // Gestión de aplicaciones
- FilesService     // Carga de archivos
```

## 📊 Arquitectura de Estado

### Redux Toolkit Slices

```typescript
// authSlice - Gestión de autenticación
- loginStart/loginSuccess/loginFailure
- logout
- updateUser/updateTokens
- clearError

// uiSlice - Gestión de interfaz
- setTheme/toggleTheme
- setLanguage
- setSidebarOpen/toggleSidebar
- addNotification/removeNotification
```

## 🎯 Roadmap y Mejoras Futuras

### Funcionalidades Planificadas

- [ ] **PWA** - Aplicación web progresiva
- [ ] **Push notifications** - Notificaciones en tiempo real
- [ ] **Offline support** - Soporte sin conexión
- [ ] **Dark mode automático** - Basado en preferencias del sistema
- [ ] **Accessibility** - Mejoras de accesibilidad WCAG 2.1
- [ ] **Performance monitoring** - Métricas de rendimiento

### Optimizaciones Técnicas

- [ ] **Virtual scrolling** para listas grandes
- [ ] **Service Workers** para caching
- [ ] **Bundle optimization** adicional
- [ ] **E2E Testing** con Playwright
- [ ] **Storybook** para documentación de componentes

## 🤝 Contribución

### Estándares de Código

- Seguir las reglas de **ESLint** y **Prettier**
- Usar **TypeScript** estricto
- Escribir **tests** para nuevas funcionalidades
- Documentar **componentes complejos**
- Seguir **convenciones de naming**

### Proceso de Desarrollo

1. **Feature branch** desde `main`
2. **Commits semánticos** (conventional commits)
3. **Tests** pasando
4. **Code review** requerido
5. **Merge** a `main`

## 📞 Soporte

Para soporte técnico o preguntas sobre el frontend:

- **Documentación**: Este README
- **Issues**: GitHub Issues
- **Logs**: Consola del navegador con `VITE_ENABLE_LOGGING=true`

---

**Desarrollado con ❤️ por el equipo LTI**
