# Backend - Sistema de Cursos Online

API RESTful desarrollada con Express.js y TypeScript para la gestión completa del sistema de cursos online.

## 📋 Descripción

Backend que proporciona endpoints para:
- Autenticación y autorización de usuarios
- Gestión de cursos
- Inscripciones de alumnos
- Gestión de clases y material didáctico
- Administración de usuarios

## 🏗️ Arquitectura

El proyecto sigue una arquitectura de capas:

```
src/
├── controllers/        # Capa de presentación - maneja requests HTTP
├── services/          # Lógica de negocio principal
├── models/            # Esquemas de MongoDB (Mongoose)
├── repositories/      # Acceso a datos (patrón Repository)
├── routes/            # Definición de endpoints
├── middlewares/       # Middlewares (autenticación, validación, etc)
├── validators/        # Validadores de entrada
├── dtos/              # Data Transfer Objects
├── factories/         # Patrones factory
├── utils/             # Funciones auxiliares
├── config/            # Configuración de la app
├── app.ts             # Configuración de Express
└── index.ts           # Punto de entrada
```

## 🔧 Tecnologías

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **TypeScript** - Lenguaje tipado
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - JSON Web Tokens para autenticación
- **bcryptjs** - Hash de contraseñas
- **ESLint** - Linting de código
- **Prettier** - Formateo de código

## 📦 Dependencias Principales

```json
{
  "express": "^4.x",
  "mongoose": "^7.x",
  "typescript": "^5.x",
  "jsonwebtoken": "^9.x",
  "bcryptjs": "^2.x",
  "dotenv": "^16.x"
}
```

## ⚙️ Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd SistemaDeCursosOnline/backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` en la raíz del backend:
```env
MONGO_URL=mongodb://localhost:27017/cursos_online
PORT=3000
SECRET='ESTE-ES-EL-SECRETO-DE-MI-API'
NODE_ENV=development
```

## 🚀 Ejecución

### Modo Desarrollo
```bash
npm run dev
```

El servidor se inicia en `http://localhost:3000`

### Compilar TypeScript
```bash
npm run build
```

### Ejecutar versión compilada
```bash
npm start
```

## 🔍 Linting y Formato

### Ejecutar ESLint
```bash
npm run lint
```

### Corregir errores automáticamente
```bash
npm run lint:fix
```

### Formato con Prettier
```bash
npm run format
```

## 🔐 Autenticación

El sistema utiliza **JWT (JSON Web Tokens)** para autenticación:

1. El usuario proporciona credenciales en login
2. El servidor valida y genera un JWT
3. El cliente incluye el token en el header `Authorization: Bearer <token>`
4. Middleware `authenticate` valida el token en cada request protegido

### Roles Disponibles

- **ADMIN** - Acceso total, puede gestionar usuarios y roles
- **PROFESOR** - Puede crear y gestionar cursos y material
- **ALUMNO** - Puede ver cursos e inscribirse

## 📚 Estructura de Endpoints

### Autenticación
- `POST /auth/login` - Login de usuario
- `POST /auth/register` - Registro de nuevo usuario

### Usuarios
- `GET /usuarios` - Obtener todos los usuarios
- `GET /usuarios/:id` - Obtener usuario por ID
- `PUT /usuarios/:id` - Actualizar usuario
- `DELETE /usuarios/:id` - Eliminar usuario

### Cursos
- `GET /cursos` - Listar todos los cursos
- `GET /cursos/:id` - Obtener detalle del curso
- `POST /cursos` - Crear curso (PROFESOR/ADMIN)
- `PUT /cursos/:id` - Actualizar curso
- `DELETE /cursos/:id` - Eliminar curso

### Inscripciones
- `POST /inscripciones` - Inscribirse en un curso
- `GET /inscripciones/usuario/:userId` - Cursos del usuario
- `GET /inscripciones/curso/:courseId` - Usuarios de un curso
- `DELETE /inscripciones/:id` - Cancelar inscripción

### Clases
- `POST /clases` - Crear clase
- `GET /clases/curso/:courseId` - Clases de un curso
- `PUT /clases/:id` - Actualizar clase
- `DELETE /clases/:id` - Eliminar clase

### Material
- `POST /material` - Subir material
- `GET /material/clase/:classId` - Material de una clase
- `DELETE /material/:id` - Eliminar material

## ✅ Mejoras de Calidad de Código

### Correcciones Implementadas (v1.0)

✅ **Operadores de comparación**
- Reemplazados todos los `==` por `===` para comparación estricta

✅ **Imports limpios**
- Removidos imports no utilizados en:
  - `usuario.controller.ts` - Removido `jwt`
  - `inscripciones.service.ts` - Removido `Curso`
  - `user.service.ts` - Removido `bcryptjs`

✅ **Bloques vacíos**
- Completados catch blocks vacíos en:
  - `inscripciones.controller.ts`
  - `inscripciones.service.ts`

✅ **TypeScript & ESLint**
- Agregado `eslint-disable-next-line` para namespace en Express type augmentation
- Mejorada consistencia de código

✅ **Arquitectura de Datos (DTOs)**
- Implementación de `CreateUserDTO`, `UpdateUserDTO`, `CursoDTO` y `MaterialDTO`.
- Separación de responsabilidades: los Services ahora validan la entrada mediante DTOs antes de interactuar con el modelo.

✅ **Patrón Repository Tipado**
- Refactor de `ICursoRepository` eliminando el uso de `any`.
- Sincronización de tipos entre la base de datos (Interfaces) y la API (DTOs).

## 📝 Convenciones de Código

### Nombres de archivos
- Controllers: `{entidad}.controller.ts`
- Services: `{entidad}.service.ts`
- Models: `{entidad}.schema.ts`
- Routes: `{entidad}.route.ts`
- DTOs: `{entidad}DTO.ts`

### Estructura de Response
```typescript
// Success
{ 
  success: true,
  data: { ... },
  message?: "Optional message"
}

// Error
{ 
  success: false,
  error: "Error message",
  status: 400
}
```

### Validación de Entrada
Todos los inputs se validan usando middleware `validate` que verifica:
- Tipos de datos
- Campos requeridos
- Formato de emails
- Longitud de strings

---

**Para más información**, consulta el [README principal](../../README.md)
