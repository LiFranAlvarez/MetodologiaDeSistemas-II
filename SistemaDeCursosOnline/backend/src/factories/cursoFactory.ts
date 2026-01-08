import { EstadoCurso } from "../services/curso.service";

export interface CursoDTO {
  titulo: string;
  descripcion?: string;
  estado: EstadoCurso;
}

export class CursoFactory {
  static fromRequest(body: any): CursoDTO {
    return {
      titulo: body.titulo,
      descripcion: body.descripcion,
      estado: body.estado ?? "PENDIENTE",
    };
  }
}
