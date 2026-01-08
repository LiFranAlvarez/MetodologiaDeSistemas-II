import { EstadoCurso } from "../services/curso.service";

export interface CursoDTO {
  titulo: string;
  descripcion?: string;
  estado?: EstadoCurso;
}
