import { Router } from "express";
import * as CursosController from "../controllers/cursos.controller";
import { authenticate } from "../middlewares/authenticate";
import { authorizeRole } from "../middlewares/authorizeRole";
import { authorizeCursoEdit } from "../middlewares/authorizeCurso";
const cursoRouter = Router();

cursoRouter.get('/cursos' ,CursosController.listCursos); // array de cursos 
cursoRouter.get('/cursos/:idCurso',CursosController.getCursoById)
cursoRouter.get('/cursos/profesor/:idProfesor', CursosController.getCursosByProfesor);
cursoRouter.post('/cursos',authenticate, authorizeRole('ADMIN', 'PROFESOR'),  CursosController.crearCurso); // crear un curso
cursoRouter.put('/cursos/:idCurso',authenticate, authorizeCursoEdit  ,CursosController.updateCurso); // edita un crso hay que pasarle el curso completo
cursoRouter.delete('/cursos/:idCurso', authenticate, authorizeRole('ADMIN'), CursosController.deleteCurso); // elimina un curso
export default cursoRouter;