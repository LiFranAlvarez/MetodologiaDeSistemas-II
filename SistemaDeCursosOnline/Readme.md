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

-------------------------------------------------------------

DESARROLLO

MODELS

usuario.ts
Clase base que define los atributos y métodos comunes a todos los usuarios: id, nombre, apellido, email, password, rol, y conectado.
Incluye el método login() y aplica el patrón Factory Method para crear distintos tipos de usuarios (Administrador, Docente y Estudiante) de manera desacoplada.

estudiante.ts
Subclase de Usuario.
Posee el atributo adicional legajo y el método update() (implementado desde la interfaz IObservador), que permite recibir notificaciones automáticas de los cursos.
Representa el observador dentro del patrón Observer.

docente.ts
Subclase de Usuario.
Incluye atributos como especialidad y la capacidad de definir estrategias de evaluación.
Implementa el patrón Strategy, permitiendo cambiar dinámicamente el método de evaluación de los estudiantes (por ejemplo, evaluación tipo ensayo o multiple choice).

administrador.ts
Subclase de Usuario.
Su función principal es la gestión global del sistema: usuarios, cursos y permisos.
Representa la capa de control administrativo.

curso.ts
Clase que representa los cursos del sistema, con atributos como id, codigo, titulo, descripcion, categoria, fechaCreacion y docente.
Contiene una lista de estudiantes suscriptos (observadores) y los métodos agregarObservador(), notificarObservadores(), agregarLeccion() e inscribirEstudiante().
Implementa el patrón Observer, actuando como el Sujeto (Subject) que notifica a los observadores (estudiantes) cuando se agregan nuevas lecciones o materiales.

Interface

update.ts: utilizada en el patrón Observer para definir el método update().

ICrud.ts y ICursoCrud.ts: definen las operaciones básicas de creación, lectura, actualización y eliminación de entidades, utilizadas por las clases o servicios que manejan persistencia y gestión de cursos.

MIDDLEWARES

authMiddleware.ts
Verifica si el usuario está autenticado antes de permitir el acceso a determinadas rutas.
Controla la validez del token o la sesión activa.

apiKeyMiddleware.ts
Requiere que cada solicitud incluya una clave de API válida, garantizando que solo los clientes autorizados accedan a la API.

validateRole.ts
Comprueba que el usuario tenga el rol adecuado (por ejemplo, solo un administrador puede eliminar usuarios o modificar configuraciones críticas).

loggerMiddleware.ts
Registra todas las peticiones realizadas al servidor (método, ruta, fecha y hora), permitiendo auditoría y análisis posterior.

errorHandler.ts
Middleware global que captura errores en el sistema y devuelve una respuesta estándar al cliente, mejorando la estabilidad y la gestión de excepciones.

ROUTES

usuario.routes.ts: gestiona las operaciones CRUD sobre usuarios.

estudiante.routes.ts: maneja las inscripciones, progreso y notificaciones de los estudiantes.

docente.routes.ts: permite la creación de cursos, carga de materiales y calificación de estudiantes.

curso.routes.ts: administra los cursos disponibles, incluyendo creación, modificación y listado.

admin.routes.ts: ofrece rutas exclusivas para la gestión del sistema (usuarios, reportes, estadísticas, etc.).

SERVICES

La carpeta services/ contiene la clase Elearning.ts, que implementa el patrón Facade.
Este patrón simplifica la interacción entre los diferentes módulos del sistema (usuarios, cursos, docentes y estudiantes), proporcionando una interfaz única para las operaciones más comunes.

La fachada (ElearningFacade) permite realizar tareas como:

Crear usuarios y cursos.

Inscribir estudiantes.

Centralizar la lógica de interacción entre las distintas clases del sistema.

Esto facilita la integración del sistema con posibles extensiones futuras, como servicios de pagos, notificaciones externas o reportes.