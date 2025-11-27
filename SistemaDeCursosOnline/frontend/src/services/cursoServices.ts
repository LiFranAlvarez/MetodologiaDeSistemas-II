import { Curso } from "../types/cursoType";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getCursos = async (): Promise<Curso[]> => {
  const res = await fetch(`${API_URL}/cursos`);
  if (!res.ok) throw new Error("Error al obtener cursos");
  return res.json();
};

export const getCursoById = async (id: string | number): Promise<Curso> => {
  const res = await fetch(`${API_URL}/cursos/${id}`,{
    method: "GET",
    cache: "no-store", // 👈 evita que devuelva 304
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener curso");
  return res.json();
};

export const createCurso = async (curso: Curso): Promise<Curso> => {
  const res = await fetch(`${API_URL}/cursos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(curso),
  });
  if (!res.ok) throw new Error("Error al crear curso");
  return res.json();
};

export const updateCurso = async (id: string | number, curso: Curso): Promise<Curso> => {
  const res = await fetch(`${API_URL}/cursos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(curso),
  });
  if (!res.ok) throw new Error("Error al actualizar curso");
  return res.json();
};

export const deleteCurso = async (id: string | number): Promise<void> => {
  const res = await fetch(`${API_URL}/cursos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Error al eliminar curso");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCursosByProfesor = async (idProfesor: string): Promise<any[]> => {
  const res = await fetch(`${API_URL}/api/cursos/profesor/${idProfesor}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener cursos del profesor");
  return res.json();
};