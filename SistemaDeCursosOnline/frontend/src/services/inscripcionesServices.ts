import { Inscripcion } from "../types/inscripcionType";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getCursosByUser = async (userId: string): Promise<Inscripcion[]> => {
  const res = await fetch(`${API_URL}/api/inscripcion/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener cursos del usuario");
  return res.json();
};
export const inscribirCurso = async (cursoId: string, userId: string) => {
  const res = await fetch(`${API_URL}/api/inscripcion/:idCurso/:idUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cursoId, userId })
  });
  if (!res.ok) throw new Error("Error al inscribirse al curso");
  return res.json();
};

// 📍 Abandonar curso
export const abandonarCurso = async (cursoId: string, userId: string) => {
  const res = await fetch(`${API_URL}/api/inscripcion/cancel/:idInsc`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cursoId, userId })
  });
  if (!res.ok) throw new Error("Error al abandonar curso");
  return res.json();
};

// 📍 Completar curso
export const completarCurso = async (cursoId: string, userId: string) => {
  const res = await fetch(`${API_URL}/api/inscripcion/completar`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cursoId, userId })
  });
  if (!res.ok) throw new Error("Error al completar curso");
  return res.json();
};

export default {getCursosByUser,inscribirCurso,abandonarCurso,completarCurso};
