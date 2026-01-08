import Curso from "../models/curso.schema";
import { ICursoRepository } from "./ICursoRepository";
import { ICurso } from "../services/curso.service";
import HttpError from "../utils/httpError";

export class CursoMongoRepository implements ICursoRepository {
  async findAll(): Promise<ICurso[]> {
    try {
      return await Curso.find();
    } catch {
      throw new HttpError("Error DB obteniendo cursos", 500);
    }
  }

  async findByProfesor(idProfesor: string): Promise<ICurso[]> {
    try {
      return await Curso.find({ profesor: idProfesor });
    } catch {
      throw new HttpError("Error DB obteniendo cursos por profesor", 500);
    }
  }

  async create(data: ICurso): Promise<ICurso> {
    try {
      return await Curso.create(data);
    } catch {
      throw new HttpError("Error DB creando curso", 500);
    }
  }

  async update(idCurso: string, data: ICurso): Promise<ICurso | null> {
    try {
      return await Curso.findByIdAndUpdate(idCurso, data, {
        new: true,
        runValidators: true,
      });
    } catch {
      throw new HttpError("Error DB actualizando curso", 500);
    }
  }

  async delete(idCurso: string): Promise<void> {
    try {
      await Curso.findByIdAndDelete(idCurso);
    } catch {
      throw new HttpError("Error DB eliminando curso", 500);
    }
  }
}
