# Arquitectura Técnica – Frontend (React SPA)

## Resumen General
- **Tipo de app**: SPA (Single Page Application).
- **Framework**: ReactJS.
- **Estilo visual**: Material UI (MUI).
- **Autenticación**: JWT + Refresh Token.
- **Roles**: Admin, Reclutador, Candidato.
- **Idiomas**: Inglés / Español (i18n).
- **Modo oscuro**: Sí.
- **Gestión de archivos**: Sí, incluye carga múltiple, drag & drop, barra de progreso.
- **Testing**: Básico desde el inicio (Jest + Testing Library).
- **SEO**: Importante.

## Estructura del Frontend (basada en features)
El frontend va estar dentro de una carpeta llamada "frontend" en el directorio raiz del proyecto.
```
/src
  /auth
  /dashboard
  /candidates
  /recruiters
  /admin
  /shared
    /components
    /hooks
    /i18n
    /theme
    /layout
    /services
    /utils
    /store (según lib que uses)
  /routes
  App.tsx
  main.tsx 
  ```

## Gestión de Estado
Como hay múltiples roles, vistas protegidas, manejo de sesión y permisos:

Opciones viables de Librería:
- **Redux Toolkit**:
  -	Pros: Escalable, middleware (thunk, saga), ecosistema maduro.
  - Contras: Verboso para lógica simple.
- **Zustand**:
  - Pros: Muy fácil, reactivo, perfecto para apps medianas.
  - Contras: Falta de middleware más sofisticado (aunque hay plugins).
- **Context API**:
  - Pros: Sencillo, nativo.
  - Contras: No es óptimo para cambios de estado frecuentes o compartidos.

## Autenticación y Sesión
- Guardar access_token en memory o localStorage.
- Guardar refresh_token en httpOnly cookie (si se puede desde el backend, por seguridad).
- Hook useAuth() para acceso global al usuario y sus permisos.
- Interceptores de Axios para renovar tokens automáticamente.
- Middleware de rutas privadas según rol.

## Control de Rutas y Permisos
- Definí rutas en un archivo modular: ``` /routes/index.ts ```
- Cada ruta puede tener propiedades como:
  ``` 
  {
    path: "/admin/dashboard",
    component: AdminDashboard,
    roles: ["admin"],
    private: true
  } 

- Crear un hook 
  ``` useHasPermission('candidates.create') ```
- O un HOC ``` withPermission(Component, ['admin']) ```.
- Usar hooks personalizados para mejor flexibilidad y reutilización.

## Carga de Archivos
- Usá react-dropzone para drag & drop.
- Axios + FormData para subir archivos.
- Crear componente reusable FileUploader con:
  - Progress bar.
  - Cancelación de carga.
  - Extensiones y tamaño permitido configurables.

## i18n y SEO
- Usar react-i18next.
- Organizar textos en /shared/i18n/en.json, /es.json, etc.
- Añadir metaetiquetas dinámicas con react-helmet-async o @tanstack/react-head para SEO.
- Alternar idioma vía dropdown y persistirlo en localStorage.

## Tema y Modo Oscuro
- Material UI ya soporta darkMode con ThemeProvider
- Crear una lógica de toggle en contexto ThemeContext
- Guardar preferencia del usuario (light/dark) en localStorage

## Testing y Calidad de Código
- Jest + React Testing Library
- ESLint, Prettier, Husky, Lint-staged para mantener código limpio
- Puedes usar Vitest si preferís una alternativa moderna

## DevOps y Entornos
- .env para REACT_APP_API_URL, etc.
- Vercel o Netlify para deploy
