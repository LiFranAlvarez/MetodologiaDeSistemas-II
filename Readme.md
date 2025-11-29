Grupo 4

Integrantes: Lisando Alvarez, Angelina Rossi, Mateo Belatti.

Documentación del Proyecto

Sistema de Gestión de Cursos Online

Descripción General

Este proyecto es un sistema completo para la gestión de cursos online compuesto por un backend en Node.js + TypeScript y un frontend en React + Vite. El objetivo principal del sistema es permitir la administración de cursos, usuarios y contenido educativo, brindando una experiencia fluida tanto para alumnos como para administradores.

Funcionalidades principales

Frontend

Interfaz moderna en React
Gestión de usuarios
Listado y visualización de cursos
Autenticación
Consumo de API REST
Backend

API REST con Express
Rutas protegidas y sistema de autenticación
Gestión de cursos, usuarios y sesiones
Validación de datos
Tecnologías utilizadas

Backend

Node.js + Express
TypeScript
JWT para autenticación
Dotenv para configuración
Frontend

React + Vite
TypeScript
React Router
Fetch API para comunicación con backend
Instalación

Clonar el repositorio git clone https://github.com/LiFranAlvarez/MetodologiaDeSistemas-II.git

Backend
cd backend
npm install
npx tsc
node dist/index.js

POST MAN

1|cargar un profesor -> POST http://localhost:3000/api/usuario 
{ "nombre": "PROFESOR 1 ", "email": "profesor1@hotmail.com", "password": "profesor" , "rol": "PROFESOR" }

2| cargar clases -> POST http://localhost:3000/api/clases 
[ { "titulo": "Introducción a Node.js", "estado": "DISPONIBLE", "linkGrabacion": "https://youtu.be/nodejs-intro" }, { "titulo": "Express y Rutas Básicas", "estado": "PENDIENTE", "linkGrabacion": "" } ]

3| cargar material -> POST http://localhost:3000/api/materiales

[{ "titulo": "Guía de Wireframes", "tipo": "PDF", "enlace": "https://uxdocs.com/wireframes-guide.pdf" }, { "titulo": "Prototipado con Figma", "tipo": "Video", "enlace": "https://vimeo.com/figma-prototyping" } ]

4| cargar cursos -> POST http://localhost:3000/api/cursos

{ "titulo": "Programación Backend con Node.js", "descripcion": "Curso práctico sobre Node.js, Express, arquitectura de APIs y conexión con bases de datos.", "estado": "PENDIENTE", "profesor": { "$0id":"ID PROFESOR" }, "clases": [ { "_id":"ID DE PRMER CLASE" }, { "_id":"ID DE SEGUNDA CLASE" }, ], "materiales": [ { "_id":"ID DE UN MATERIAL" }, { "_id":"ID DE OTRO MATERIAL" } ], "categorias": [ "Backend", "APIs", "JavaScript" ] }

Frontend
cd frontend
npm install
npm run dev

La API sigue formato REST e incluye:

Autenticación (login/register)

Gestión de cursos

Gestión de usuarios

Envío y recepción de datos en JSON

Documentación Técnica Interna

Decisiones de arquitectura

Se eligió Node.js + Express por su rapidez para prototipado de APIs REST.
Se utiliza TypeScript para mejorar mantenibilidad y escalabilidad.
React se eligió por su modularidad y facilidad para gestionar UI dinámicas.
Vite se seleccionó por su velocidad de desarrollo comparado con Webpack.
Convenciones de código

Estándares de estilo basados en Google Styleguide.
Rutas separadas por módulo.
Controllers → lógica de entrada/salida
Services → lógica de negocio
Models → acceso a datos
Patrones de Diseño Aplicados en el Proyecto

=> Singleton

Ubicación:

-config/db.connect.ts -config/config.ts

Función

Garantizar una única instancia de la conexión a la base de datos. Evitar múltiples conexiones y errores de rendimiento.

=> Facade

Ubicación:

-services/*.ts en el frontend

-services/*.ts en el backend

Función

Los services simplifican el uso del backend o la lógica de negocio.

El frontend oculta fetch, headers, tokens.

El backend oculta validaciones, modelos, queries.

=> Chain of Responsibility

Ubicación:

/src/middlewares/*

Función

Los middlewares se ejecutan en cadena Cada middleware decide si pasa la petición al siguiente.

=> Strategy

Ubicación:

middlewares/validate.ts

models/*.schema.ts

Función

Cada esquema de validación funciona como una “estrategia distinta”. El middleware ejecuta una validación u otra dependiendo del tipo de entidad.

