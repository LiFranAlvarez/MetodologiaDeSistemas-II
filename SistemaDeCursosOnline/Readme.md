Grupo 4

Integrantes: Lisando Alvarez, Angelina Rossi, Mateo Belatti, Ana Paula Schechtel

Sistema de Cursos Online
Se trata de una plataforma digital de cursos online que permite a los usuarios registrarse, acceder a contenidos educativos y gestionar sus avances. Está pensada para brindar una experiencia sencilla, accesible y organizada tanto para estudiantes como para administradores de cursos. 

Los patrones que consideramos más apropiados para aplicar en nuestro proyecto son:

Patrones Creacionales:
FACTORY METHOD
Porque permite crear distintos tipos de usuarios (administrador, profesor, alumno) sin que el código cliente se acople a clases concretas y facilita la extensión futura (ejemplo: agregar rol “tutor”).

SINGLETON
Lo consideramos adecuado para la conexión a la base de datos, gestor de logs y configuración global del sistema, ademas que asegura que solo exista una instancia centralizada de estos recursos, asi se evita duplicación de conexiones.


Patrones Estructurales:
FACADE
Utilizaremos este patron ya que simplifica el acceso a subsistemas (por ej. gestión de usuarios, cursos, pagos, reportes).


Patrones de Comportamiento:
OBSERVER
Permitiría notificar automáticamente a los estudiantes cuando un profesor sube nuevo material, o cuando hay un cambio en la fecha de entrega. Además favorece la suscripción/desuscripción dinámica.

STRATEGY
Resultaría útil para implementar diferentes métodos de evaluación (examen múltiple choice, ensayo, práctica).

Hay algunos otros patrones que, aunque no los vamos a utilizar, pero servirian para desarrollar el proyecto de una forma mas compleja en un posible futuro. Algunos ejemplos son el patron creacional ABSTRACT (para adaptar nuestras interfaces dependiendo los roles o plataformas),el patron estructural ADAPTER(para incluir pasarelas de pago o plataformas de video) y el patron de comportamiento COMMAND(para hacer posible el envio de tareas o la generacion de certificados).


# Prot - Proyecto completo (Mínimo funcional)

Monorepo con frontend (React + Vite + TypeScript) y backend (Node + Express + TypeScript + Mongoose).

Contenido:
- `frontend/` — aplicación cliente (Vite + React + TS).
- `backend/` — API REST (Express + TypeScript + Mongoose).

Rápido arranque local

1) Backend

```powershell
cd backend
# instalar dependencias si es la primera vez
npm install
# compilar y arrancar 
npx tsc
node dist/index.js
```

Variables de entorno (usa `backend/.env.example` como plantilla). Asegúrate de tener MongoDB corriendo y `DB_URI` apuntando a él.

2) Frontend

```powershell
cd frontend
npm install
npm run dev
```

Notas rápidas de desarrollo
- El backend expone rutas bajo el prefijo `/api`.
- El frontend usa `VITE_API_URL` para apuntar al backend.


