import { CursosService } from "./curso.service";
import { CursoMongoRepository } from "../repositories/CursoMongoRepository";

const cursoRepository = new CursoMongoRepository();
export const cursosService = new CursosService(cursoRepository);
