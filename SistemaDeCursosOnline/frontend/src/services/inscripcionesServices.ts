const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getCursosByUser = async (userId: string): Promise<unknown[]> => {
  const res = await fetch(`${API_URL}/api/inscripcion/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener cursos del usuario");
  return res.json();
};

export default { getCursosByUser };
