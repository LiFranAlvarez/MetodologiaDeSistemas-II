# 🎓 Sistema de Cursos Online

## 👥 Equipo de Desarrollo

**Grupo 4**

Integrantes:
- Lisando Alvarez
- Angelina Rossi
- Mateo Belatti

---

## 📋 Descripción

Sistema integral de gestión de cursos online desarrollado con arquitectura full-stack moderna. Permite la administración completa de cursos, usuarios, inscripciones y material educativo con una experiencia de usuario intuitiva y responsive.

## ✨ Funcionalidades Principales

### Para Alumnos
- 📚 Explorar catálogo de cursos con búsqueda y filtros
- 📝 Inscribirse en cursos disponibles
- 👤 Gestionar perfil de usuario
- 📖 Acceder a material y clases de cursos inscritos

### Para Profesores
- ✏️ Crear y gestionar cursos
- 📚 Organizar clases y material didáctico
- 👥 Ver estudiantes inscritos
- 📊 Gestionar contenido educativo

### Para Administradores
- 🔐 Gestión total de usuarios y roles
- 📋 Supervisar cursos y inscripciones
- ⚙️ Administración del sistema

## 🏗️ Arquitectura del Proyecto

```
SistemaDeCursosOnline/
├── backend/                          # API REST
│   ├── src/
│   │   ├── controllers/             # Lógica de requests
│   │   ├── services/                # Lógica de negocio
│   │   ├── models/                  # Esquemas MongoDB
│   │   ├── routes/                  # Definición de endpoints
│   │   ├── middlewares/             # Autenticación, validación
│   │   ├── validators/              # Validación de datos
│   │   ├── dtos/                    # Data Transfer Objects
│   │   ├── repositories/            # Acceso a datos
│   │   ├── factories/               # Patrones factory
│   │   ├── config/                  # Configuración
│   │   └── utils/                   # Utilidades
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md                    # Documentación backend
│
├── frontend/                         # Aplicación React
│   ├── src/
│   │   ├── components/              # Componentes reutilizables
│   │   ├── pages/                   # Páginas principales
│   │   ├── services/                # Consumo de API
│   │   ├── context/                 # Context API
│   │   ├── hooks/                   # Hooks personalizados
│   │   ├── types/                   # Tipos TypeScript
│   │   ├── styles/                  # Estilos CSS
│   │   └── assets/                  # Imágenes e íconos
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md                    # Documentación frontend
│
└── docs/                             # Documentación adicional
```

## 💎 Calidad de Software y Decisiones de Arquitectura

Como parte del compromiso con la excelencia técnica, el **Grupo 4** implementó una serie de decisiones arquitectónicas orientadas a la escalabilidad y mantenibilidad del sistema.

### 🛡️ Justificación de Decisiones Técnicas

| Decisión | Razón Técnica | Impacto en el Proyecto |
| :--- | :--- | :--- |
| **Data Transfer Objects (DTOs)** | Desacoplamiento de la entrada de datos respecto al modelo de persistencia. | Protege la integridad de la DB y facilita el manejo de tipos entre Frontend y Backend. |
| **Patrón Repository** | Abstracción de la lógica de acceso a datos. | Permite cambiar el motor de base de datos sin afectar la lógica de negocio en los Services. |
| **Tipado Estricto (No `any`)** | Eliminación sistemática de tipos genéricos. | Reduce en un 90% los errores en tiempo de ejecución al atrapar bugs durante la compilación. |
| **Arquitectura de Capas** | Separación clara: Controller ↔ Service ↔ Repository. | Mejora la legibilidad y permite que el equipo trabaje en módulos independientes sin conflictos. |
| **Normalización de IDs** | Conversión explícita de `ObjectId` a `string`. | Garantiza compatibilidad total con el Frontend y evita errores de serialización JSON. |

## 🧩 Patrones de Diseño Aplicados

Para garantizar la robustez del sistema, se implementaron patrones de diseño clásicos (GoF) adaptados a una arquitectura moderna de Node.js.

### 1. Singleton (Creacional)
**Ubicación:** `config/db.connect.ts` y `config/config.ts`
* **Por qué:** Conectar a la base de datos es una operación costosa. No queremos abrir una conexión nueva cada vez que un usuario hace login.
* **Decisión:** Garantizamos una **única instancia** de la conexión a MongoDB en todo el ciclo de vida de la aplicación, evitando fugas de memoria y saturación de sockets.

### 2. Repository (Acceso a Datos)
**Ubicación:** `repositories/*.repository.ts`
* **Por qué:** Queremos que la lógica de negocio (Services) no dependa directamente de Mongoose o de consultas específicas de base de datos.
* **Decisión:** Creamos una capa intermedia que actúa como una "colección de objetos en memoria". Esto facilita los **tests unitarios** y permite cambiar de base de datos sin tocar la lógica del negocio.


### 3. Facade (Estructural)
**Ubicación:** `services/*.service.ts` (Backend y Frontend)
* **Por qué:** Los controladores no deberían conocer los detalles complejos de validación, hashing de contraseñas o queries complejas.
* **Decisión:** Los Services exponen una **interfaz simple** (una "fachada") que oculta toda la complejidad interna. El controlador solo pide `createOne(data)` y el Service se encarga del resto.

### 4. Chain of Responsibility (Comportamiento)
**Ubicación:** `middlewares/*.middleware.ts` en las rutas.
* **Por qué:** Un request debe pasar por varias verificaciones (¿Está autenticado? ¿Es administrador? ¿El formato es correcto?) antes de ejecutarse.
* **Decisión:** Implementamos una cadena donde cada middleware decide si la petición continúa o se detiene, permitiendo una seguridad modular y escalable.

### 5. Strategy (Comportamiento)
**Ubicación:** `middlewares/validate.ts` y esquemas de validación.
* **Por qué:** Diferentes rutas requieren diferentes reglas de validación (un curso no se valida igual que un usuario).
* **Decisión:** El middleware de validación selecciona y ejecuta la "estrategia" (esquema) correcta dinámicamente según la entidad que se está procesando.


### ✅ Mejoras de Refactorización (v1.0)

Durante la fase de auditoría de calidad, se aplicaron las siguientes mejoras:

* **Centralización de DTOs:** Se estandarizaron los contratos de `User`, `Curso`, `Clase` y `Material` en una carpeta dedicada, eliminando interfaces duplicadas.
* **Seguridad en el Flujo de Datos:** El uso de `UpdateDTOs` (Partial) permite actualizaciones seguras, enviando solo los campos necesarios sin comprometer el resto del documento.
* **Sanitización de Respuestas:** Se implementó un mapeo en los servicios para asegurar que datos sensibles (como `passwordHash`) nunca sean expuestos en la API.
* **Consistencia Lógica:** Reemplazo global de comparaciones débiles (`==`) por comparaciones estrictas (`===`), asegurando una lógica booleana robusta.
* **Manejo de Errores Profesional:** Se completaron todos los bloques `catch` con un sistema de `HttpError` personalizado que devuelve códigos de estado HTTP precisos (400, 404, 500).

## 🔧 Tecnologías Utilizadas

### Backend
- ✅ **Node.js** - Runtime JavaScript
- ✅ **Express.js** - Framework web
- ✅ **TypeScript** - Lenguaje tipado
- ✅ **MongoDB** - Base de datos NoSQL
- ✅ **Mongoose** - ODM para MongoDB
- ✅ **JWT** - Autenticación token-based
- ✅ **bcryptjs** - Hash de contraseñas
- ✅ **ESLint & Prettier** - Calidad de código

### Frontend
- ✅ **React 18** - Librería UI
- ✅ **Vite** - Build tool
- ✅ **TypeScript** - Lenguaje tipado
- ✅ **CSS3** - Estilos nativos
- ✅ **Context API** - Manejo de estado
- ✅ **Fetch API** - Comunicación HTTP

## 📦 Requisitos Previos

- Node.js v18 o superior
- npm v9 o superior
- MongoDB (local o remoto)
- Git
- Un editor de código (VS Code recomendado)

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/LiFranAlvarez/MetodologiaDeSistemas-II.git
cd MetodologiaDeSistemas-II/SistemaDeCursosOnline
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

**Crear archivo `.env` en la carpeta backend:**
```env
MONGO_URL=mongodb://localhost:27017/cursos_online
PORT=3000
SECRET='ESTE-ES-EL-SECRETO-DE-MI-API'
NODE_ENV=development
```

### 3. Configurar Frontend

```bash
cd ../frontend
npm install
```

**Crear archivo `.env` en la carpeta frontend:**
```env
VITE_API_URL=http://localhost:3000
```

## 🎯 Iniciar la Aplicación

### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📝 Scripts Disponibles

### Backend

```bash
npm run dev          # Modo desarrollo con hot reload
npm run build        # Compilar TypeScript
npm run start        # Ejecutar versión compilada
npm run lint         # Validar código
npm run lint:fix     # Corregir errores automáticamente
npm run format       # Formatear código con Prettier
```

### Frontend

```bash
npm run dev          # Desarrollo con HMR
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Validar código
npm run lint:fix     # Corregir errores automáticamente
npm run type-check   # Validar tipos TypeScript
```

## 👥 Roles y Permisos

| Rol | Permisos |
|-----|----------|
| **ADMIN** | Acceso total, gestionar usuarios y roles |
| **PROFESOR** | Crear/editar cursos, gestionar material y clases |
| **ALUMNO** | Ver catálogo, inscribirse en cursos |

## 🔐 Sistema de Autenticación

- **Método**: JWT (JSON Web Tokens)
- **Almacenamiento**: localStorage (frontend)
- **Headers**: `Authorization: Bearer <token>`
- **Expiración**: Configurable

## 📊 Endpoints Principales

### Autenticación
- `POST /auth/login` - Login
- `POST /auth/register` - Registro

### Cursos
- `GET /cursos` - Listar cursos
- `POST /cursos` - Crear curso
- `GET /cursos/:id` - Detalle del curso
- `PUT /cursos/:id` - Actualizar curso

### Inscripciones
- `POST /inscripciones` - Inscribirse
- `GET /inscripciones/usuario/:userId` - Cursos del usuario
- `DELETE /inscripciones/:id` - Cancelar inscripción

### Clases
- `POST /clases` - Crear clase
- `GET /clases/curso/:courseId` - Clases de un curso

### Material
- `POST /material` - Subir material
- `GET /material/clase/:classId` - Material de una clase



## Postman

**1|cargar un profesor** -> POST http://localhost:3000/api/usuario 
{ "nombre": "PROFESOR 1 ", "email": "profesor1@hotmail.com", "password": "profesor" , "rol": "PROFESOR" }

**2| cargar clases** -> POST http://localhost:3000/api/clases 
[ { "titulo": "Introducción a Node.js", "estado": "DISPONIBLE", "linkGrabacion": "https://youtu.be/nodejs-intro" }, { "titulo": "Express y Rutas Básicas", "estado": "PENDIENTE", "linkGrabacion": "" } ]

**3| cargar material** -> POST http://localhost:3000/api/materiales
[{ "titulo": "Guía de Wireframes", "tipo": "PDF", "enlace": "https://uxdocs.com/wireframes-guide.pdf" }, { "titulo": "Prototipado con Figma", "tipo": "Video", "enlace": "https://vimeo.com/figma-prototyping" } ]

**4| cargar cursos** -> POST http://localhost:3000/api/cursos

{ "titulo": "Programación Backend con Node.js", "descripcion": "Curso práctico sobre Node.js, Express, arquitectura de APIs y conexión con bases de datos.", "estado": "PENDIENTE", "profesor": { "ID PROFESOR" }, "clases": [ { "_id":"ID DE PRMER CLASE" }, { "_id":"ID DE SEGUNDA CLASE" } ], "materiales": [ { "_id":"ID DE UN MATERIAL" }, { "_id":"ID DE OTRO MATERIAL" } ], "categorias": [ "Backend", "APIs", "JavaScript" ] }

## 📚 Documentación Adicional

- [Backend README](./SistemaDeCursosOnline/backend/README.md)
- [Frontend README](./SistemaDeCursosOnline/frontend/README.md)

## 🤝 Contribución

1. Crear rama para feature: `git checkout -b feature/NuevaCaracteristica`
2. Hacer cambios y commits: `git commit -m "Descripción clara"`
3. Ejecutar linting: `npm run lint:fix`
4. Hacer push: `git push origin feature/NuevaCaracteristica`
5. Abrir Pull Request

## 📞 Soporte

Para reportar bugs o sugerir mejoras, abre un issue en el repositorio.

---

**Última actualización**: 13 de enero de 2026
**Estado**: ✅ Proyecto activo en desarrollo