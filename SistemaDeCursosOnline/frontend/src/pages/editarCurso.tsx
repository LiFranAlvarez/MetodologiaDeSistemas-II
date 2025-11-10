import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CursoForm from '../components/forms/cursoForms';
import  {Curso}  from '../types/cursoType';

const EditarCurso = () => {
  const { id } = useParams();
  const [curso, setCurso] = useState<Curso | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/cursos/${id}`)
      .then((res) => res.json())
      .then((data) => setCurso(data));
  }, [id]);

  const handleEditar = async (cursoEditado: Curso) => {
    await fetch(`/api/cursos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cursoEditado),
    });
    navigate('/dashboard/maestro');
  };

  return curso ? <CursoForm cursoInicial={curso} onSubmit={handleEditar} /> : <p>Cargando curso...</p>;
};

export default EditarCurso;