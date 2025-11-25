import { Clase } from "./claseType";
import { Material } from "./materialType";
import { Usuario } from "./usuarioType";

export type Curso = {
  _id?: number;
  titulo: string;
  profesor: {
    _id:string,
    nombre:string,
  };
  descripcion: string;
  estado: string;
  categorias: string[];
  clases?: Clase[];
  materiales?: Material[];
  inscriptos?: Usuario[];
};