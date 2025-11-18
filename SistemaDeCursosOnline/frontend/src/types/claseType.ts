import {Material} from "./materialType"
export type Clase = {
  id: number;
  titulo: string;
  fecha: string;
  estado: "disponible" | "pendiente";
  materiales: Material[];
};
