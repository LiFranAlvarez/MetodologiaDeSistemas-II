import { Router } from "express";
import CursosController from "../controllers/cursos.controller";
import * as auth from "../middlewares/authToken";
const cursoRouter = Router();

cursoRouter.get('/cursos' ,CursosController.listCursos); // array de cursos v
cursoRouter.get('/cursos/:idCurso',CursosController.getCursoById)
cursoRouter.get('/cursos/profesor/:idProfesor', auth.verifyToken, CursosController.getCursosByProfesor);
cursoRouter.post('/cursos',  CursosController.createCurso); // crear un curso
cursoRouter.put('/cursos/:idCurso',  CursosController.updateCurso); // edita un crso hay que pasarle el curso completo
cursoRouter.delete('/cursos/:idCurso',  CursosController.deleteCurso); // elimina un curso

export default cursoRouter;

//post(Api/cursos) --> crea un curso
            // JSON de ejemplo en body
            // {
            // "titulo": "Introducción a la Programación Web",
            // "describe": "Un curso inicial que cubre HTML, CSS y fundamentos de JavaScript.",
            // "profesor": "654e83f0a7c9d2b1e4f6a8c1", un usuario que tenga de rol profesor
            // }
//put(Api/cursos:IdCurso) --> edita un curso, pasar solamente campos a editar
            // JSON ejemplo de cambiar descripcion y estado
            // NO CAMBIAR ESTADO HACERLO CON RUTA FUTURA
            // {
            // "describe": "La nueva descripción se enfoca en el desarrollo de microservicios y bases de datos NoSQL.",
            // "estado": "EN CURSO" 
            // }
