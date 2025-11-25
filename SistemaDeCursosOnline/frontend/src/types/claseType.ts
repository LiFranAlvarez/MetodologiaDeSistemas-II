import {Material} from "./materialType"
export type Clase = {
  _id: string;
  titulo: string;
  fecha: string;
  estado: "DISPONIBLE" | "PENDIENTE";
  materiales: Material[];
};
