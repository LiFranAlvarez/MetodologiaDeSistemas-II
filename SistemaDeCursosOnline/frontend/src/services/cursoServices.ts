import axios from 'axios';
import { Curso } from '../types/cursoType';

const API_URL = '/api/cursos';

const config = () => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`, // si usás JWT
  },
});

export const getCursos = async (busqueda: string) => {
  const res = await axios.get(`${API_URL}?search=${busqueda}`, config());
  return res.data;
};

export const getCursoPorId = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`, config());
  return res.data;
};

export const crearCurso = async (curso: Curso) => {
  const res = await axios.post(API_URL, curso, config());
  return res.data;
};

export const editarCurso = async (id: string, curso: Curso) => {
  const res = await axios.put(`${API_URL}/${id}`, curso, config());
  return res.data;
};

export const eliminarCurso = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`, config());
  return res.data;
};
