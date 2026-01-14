# Frontend - Sistema de Cursos Online

Aplicación web responsiva desarrollada con React, TypeScript y Vite para la interfaz del sistema de gestión de cursos online.

## 📋 Descripción

Frontend que proporciona:
- Interface intuitiva para estudiantes, profesores y administradores
- Dashboard personalizado por rol
- Catálogo de cursos con búsqueda y filtros
- Sistema de inscripciones
- Gestión de perfil de usuario
- Visualización de clases y material didáctico

## 🏗️ Arquitectura

```
src/
├── components/        # Componentes reutilizables
│   ├── layout/       # Componentes de layout (Header, Sidebar, etc)
│   ├── forms/        # Formularios (Login, Registro, etc)
│   ├── catalogo/     # Componentes del catálogo
│   └── ...           # Otros componentes
├── pages/            # Páginas completas
│   ├── homePage.tsx
│   ├── loginPages.tsx
│   ├── catalogoCursos.tsx
│   ├── cursosDetallesPage.tsx
│   ├── crearCurso.tsx
│   ├── perfilPages.tsx
│   └── registroPages.tsx
├── services/         # Servicios API
├── context/          # Context API para estado global
├── hooks/            # Hooks personalizados
├── types/            # Tipos TypeScript
├── styles/           # Estilos CSS
├── assets/           # Imágenes e íconos
├── utils/            # Funciones auxiliares
└── main.tsx          # Punto de entrada
```

## 🔧 Tecnologías

- **React 18** - Librería UI
- **TypeScript** - Lenguaje tipado
- **Vite** - Build tool y dev server
- **CSS3** - Estilos nativos
- **Context API** - Manejo de estado global
- **Fetch API** - Comunicación HTTP
- **ESLint** - Linting de código

## 📦 Dependencias Principales

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "typescript": "^5.x",
  "vite": "^4.x"
}
```

## ⚙️ Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd SistemaDeCursosOnline/frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` en la raíz del frontend:
```env
VITE_API_URL=http://localhost:3000
```

## 🚀 Ejecución

### Modo Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` con HMR (Hot Module Replacement)

### Build para Producción
```bash
npm run build
```

Genera archivos optimizados en la carpeta `dist/`

### Preview del Build
```bash
npm run preview
```

### Type Checking
```bash
npm run type-check
```

## 🔍 Linting

### Ejecutar ESLint
```bash
npm run lint
```

### Corregir errores automáticamente
```bash
npm run lint:fix
```

## 🔐 Autenticación

### Sistema de Autenticación

El frontend implementa autenticación basada en JWT:

1. **Login/Registro** - Almacena token en localStorage
2. **Context API** - `authContexto.tsx` proporciona estado de autenticación
3. **Rutas protegidas** - Solo accesibles con autenticación válida
4. **Headers automáticos** - Cada request incluye el JWT token

### Estructura de Autenticación

```
context/
├── authContexto.tsx          # Interfaz y tipos
└── authProviderContexto.tsx  # Proveedor con lógica
```

## 📄 Páginas Principales

### **Home** (`homePage.tsx`)
Página inicial con información del sistema y acceso rápido

### **Login** (`loginPages.tsx`)
Formulario de autenticación

### **Registro** (`registroPages.tsx`)
Formulario de registro de nuevos usuarios

### **Catálogo de Cursos** (`catalogoCursos.tsx`)
- Lista todos los cursos disponibles
- Búsqueda por título
- Filtros por categoría
- Inscripción directa

### **Detalles del Curso** (`cursosDetallesPage.tsx`)
- Información completa del curso
- Clases y material asociado
- Opción de inscribirse

### **Crear Curso** (`crearCurso.tsx`)
Formulario para crear nuevo curso (PROFESOR/ADMIN)

### **Perfil de Usuario** (`perfilPages.tsx`)
- Información del perfil
- Cursos inscritos
- Datos de contacto

## 🧩 Componentes Principales

### Layout
- `Header` - Barra de navegación
- `Footer` - Pie de página

### Formularios
- `LoginForm` - Autenticación
- `RegisterForm` - Registro de usuarios
- `CourseForm` - Crear/editar cursos
- `ClassForm` - Crear/editar clases

### Catálogo
- `CursoCard` - Tarjeta de curso
- `CursoList` - Lista de cursos
- `SearchBar` - Buscador

## 🎨 Estilos

### Estructura CSS

```
styles/
├── forms.css
├── cursoCards.css
├── cursoDetalle.css
├── claseCard.css
├── header.css
├── home.css
├── perfilUsuario.css
└── ...
```

## 🌐 Servicios API

### Estructura de Servicios

```
services/
├── authServices.ts
├── cursoServices.ts
├── inscripcionesServices.ts
├── claseServices.ts
├── materialServices.ts
└── usuarioServices.ts
```

Cada servicio contiene funciones para:
- GET - Obtener datos
- POST - Crear recursos
- PUT - Actualizar recursos
- DELETE - Eliminar recursos

### Ejemplo de Uso

```typescript
import { getAllCursos, getCursoById } from '../services/cursoServices';

const cursos = await getAllCursos();
const curso = await getCursoById(cursoId);
```

## 📱 Responsividad

- Mobile-first approach
- Breakpoints: 320px, 768px, 1024px, 1440px
- Flexbox y CSS Grid
- Menu hamburguesa en mobile

## 🧪 Estado Global

### Context API

**authContexto.tsx** - Gestiona:
- Usuario autenticado
- Token JWT
- Rol del usuario
- Estados de carga

**busquedaContexto.tsx** - Gestiona:
- Filtros de búsqueda
- Términos de búsqueda


## 🚀 Optimizaciones

- Lazy loading de componentes
- Code splitting automático con Vite
- Optimización de imágenes

## 📝 Convenciones de Código

### Nombres de componentes
- PascalCase: `CursoCard.tsx`, `LoginForm.tsx`
- Basados en su funcionalidad

### Props Interface
```typescript
interface CursoCardProps {
  curso: ICurso;
  onInscribe?: () => void;
  className?: string;
}
```

### Estructura de Componente
```typescript
// Imports
import { FC } from 'react';

// Interface de props
interface MyComponentProps { ... }

// Componente
const MyComponent: FC<MyComponentProps> = ({ props }) => {
  return <div>...</div>;
};

// Export
export default MyComponent;
```

## 🔄 Flujo de Datos

```
UI Component
    ↓
Service Layer (cursoServices.ts)
    ↓
Fetch API
    ↓
Backend API
    ↓
Database
```

**Para más información**, consulta el [README principal](../../README.md)
