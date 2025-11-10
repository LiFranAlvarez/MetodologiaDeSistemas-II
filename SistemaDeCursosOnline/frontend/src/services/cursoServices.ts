import axios from 'axios';

export const getCursos = async (busqueda: string) => {
  const res = await axios.get(`/api/cursos?search=${busqueda}`);
  return res.data;
};