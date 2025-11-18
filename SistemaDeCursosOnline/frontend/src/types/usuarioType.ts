export type Usuario = {
  id: number;
  nombre: string;
  apellido: string;
  password?:string;
  email: string;
  rol: "estudiante" | "docente" | "administrador";
  conectado?:boolean;
};