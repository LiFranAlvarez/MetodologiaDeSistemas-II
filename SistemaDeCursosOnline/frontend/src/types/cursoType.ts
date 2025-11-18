import { Clase } from "./claseType";
import { Material } from "./materialType";
import { Usuario } from "./usuarioType";

export type Curso = {
  id?: number;
  codigo:number;
  titulo: string;
  docente: string;
  docenteId?: number;
  descripcion: string;
  categoria: string;
  clases?: Clase[];
  materiales?: Material[];
  inscriptos?: Usuario[];
};