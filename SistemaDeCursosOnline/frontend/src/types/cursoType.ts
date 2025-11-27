export type Clase = { _id?: string; titulo: string; fecha?: string; duracion?: number };
export type Material = { _id?: string; titulo: string; tipo?: string; enlace?: string };

export type Curso = {
  _id: string;
  titulo: string;
  descripcion?: string;
  estado?: "COMPLETADO" | "EN CURSO" | "PENDIENTE" | "CANCELADO";
  profesor?: { _id: string; nombre?: string } | string;
  clases?: Clase[];
  materiales?: Material[];
  categorias?: string[];
};