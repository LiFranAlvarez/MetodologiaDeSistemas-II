Grupo 4

Sistema de Cursos Online


Los patrones más apropiados para aplicar en nuestro proyecto son:

Patrones Creacionales:

Factory Method
Porque permite crear distintos tipos de usuarios (administrador, profesor, alumno) sin que el código cliente se acople a clases concretas y facilita la extensión futura (ejemplo: agregar rol “tutor”).

Singleton
Lo consideramos adecuado para la conexión a la base de datos, gestor de logs y configuración global del sistema, ademas que asegura que solo exista una instancia centralizada de estos recursos, asi se evita duplicación de conexiones.


Patrones Estructurales:

Facade

Utilizaremos este patron ya que simplifica el acceso a subsistemas (por ej. gestión de usuarios, cursos, pagos, reportes).


Patrones de Comportamiento

Observer

Permitiría notificar automáticamente a los estudiantes cuando un profesor sube nuevo material, o cuando hay un cambio en la fecha de entrega. Además favorece la suscripción/desuscripción dinámica.

Strategy

Resultaría útil para implementar diferentes métodos de evaluación (examen múltiple choice, ensayo, práctica) o formas de pago (tarjeta, transferencia, PayPal).