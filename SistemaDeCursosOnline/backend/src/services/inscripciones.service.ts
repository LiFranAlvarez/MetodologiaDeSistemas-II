import { Types } from "mongoose";
import Inscripciones from "../models/inscripciones";
import Usuario from '../models/usuario.schema';
import Curso from '../models/curso.schema';
import HttpError from '../utils/httpError';

type EstadoInscripcion = 'ACTIVA' | 'CANCELADA';
interface Inscripcion {
    CursoID: Types.ObjectId; 
    usuarioId: Types.ObjectId; 
    fechaInscripcion?: Date;
    estadoInscripcion?: EstadoInscripcion;
}
class InscripcionService{
    async createOne( idCurso: string, idUser: string ){
        try {
            return await Inscripciones.create({
            cursoId: idCurso,
            usuarioId: idUser
        });;
        } catch (error) {
            throw new HttpError("No se pudo crear inscripcion", 500);
        }
    };

    async cancelOne( idInsc: string ){
        try {
            const result = Inscripciones.findByIdAndUpdate(idInsc, {estadoInscripcion : 'CANCELADA'},{
                new : true
            })
            return result;
        } catch (error) {
            throw new HttpError("No se pudo cancelar inscripcion", 500);
        }
    };

    async getUsers( idCurso:string ){
            try {
                if (!idCurso) {
                    throw new HttpError("El ID del curso es requerido", 400);
                }
                const inscripciones = await Inscripciones.find({ cursoId: idCurso }, 'usuarioId');
                if (!inscripciones.length) {
                    return [];
                }
                const userIDs = [...new Set(inscripciones.map(i => i.usuarioId))];
                console.log(userIDs);
                const alumnosInscritos = await Usuario.find({
                    _id: { $in: userIDs },
                    rol: 'ALUMNO'
                }).select('nombre apellido email rol');
                return alumnosInscritos;
            } catch (error) {
                throw new HttpError("No se pudo obtener los usuarios del curso", 500); 
            }
    };

    async getCursos( idUser: string ){
        try {
                 if (!idUser) {
                    throw new HttpError("El ID del usuario es requerido", 400);
                }
                const cursosInscripto = await Inscripciones.find({ usuarioId: idUser }, 'cursoId');
                if (!cursosInscripto.length) {
                    return [];
                }
                const cursoIDs = [...new Set(cursosInscripto.map(i => i.cursoId))];
                const cursos = await Curso.find({
                    _id: { $in: cursoIDs }
                }).select('titulo estado profesor');

                return cursos;
        } catch (error) {
            throw new HttpError("No se pudo obtener los cursos del usuario", 500);
        }
    };
    async getAll(){
        try {
            return await Inscripciones.find();
        } catch (error) {
            
        }
    }
    
}
export default new InscripcionService();    