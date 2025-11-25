import  CursosService from '../services/curso.service'
import HttpError from '../utils/httpError';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import userService from '../services/user.service';

class CursosController{
    async listCursos(req: Request, res:Response){
        try {
            const result = await CursosService.getAll();
            if (!result) {
                return res.status(200).json({message : 'No hay cursos cargados'});
            }
            return res.status(200).json(result);
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({message : error.message})
            }
            console.error(error);
            res.status(400).json(error);
        }
    };
   async getCursoById(req: Request, res: Response) {
        try {
            const curso = await CursosService.getById(req.params.idCurso);

            if (!curso) 
                return res.status(404).json({ message: "Curso no encontrado" });

            return res.status(200).json(curso);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al obtener el curso" });
        }
    }

    async createCurso( req: Request, res: Response){
            // JSON de ejemplo
            // {
            // "titulo": "Introducción a la Programación Web",
            // "describe": "Un curso inicial que cubre HTML, CSS y fundamentos de JavaScript.",
            // "profesor": "654e83f0a7c9d2b1e4f6a8c1", un usuario que tenga de rol profesor
            // }
        try {
            const data = (req.body);
            if (!mongoose.Types.ObjectId.isValid(data.profesor)) {
                throw new HttpError('El id del profesor no es valido (CursoController.createCurso', 400)
            };
            const profesor = await userService.getOneUser(data.profesor);
            if (profesor?.rol !== 'PROFESOR' || !profesor) {
                throw new HttpError("Al crear un curso se le debe asignar un usuario con rol : PROFESOR", 400);
            }
            const result = await CursosService.createOne(data);
            res.status(201).json(result);
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({message : error.message})
            }
            console.error(error);
            res.status(400).json(error);
        }
    };
    async updateCurso( req: Request, res: Response){
        try {
            const idCurso = req.params.idCurso;
            const data = req.body
            const result = await CursosService.updateOne(idCurso, data);
            if (result === null) {
                return res.status(500).json({message : 'No se pudo actualizar el curso'})
            }
            res.status(200).json({message : 'actualizado', datos : result});
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({message : error.message})
            }
            console.error(error);
            res.status(400).json(error);
        }
    };
    async deleteCurso( req: Request, res: Response){
        try {
            const idCUrso = req.params.idCurso;
            const result = await CursosService.deleteOne(idCUrso);
            if (!result) {
                return res.status(200).json({message : 'No se encontro curso para eliminar'})
            }
            return res.status(200).json({message : `Curso id: ${idCUrso} ELIMINADO`, curso : result})
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({message : error.message})
            }
            console.error(error);
            res.status(400).json(error);
        }
    }
    async getCursosByProfesor(req: Request, res: Response){
        try {
            const idProfesor = req.params.idProfesor;
            const result = await CursosService.getByProfesor(idProfesor);
            if (!result) return res.status(200).json({ message: 'No hay cursos para este profesor' });
            return res.status(200).json(result);
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({message : error.message})
            }
            console.error(error);
            res.status(400).json(error);
        }
    }
}
export default new CursosController();