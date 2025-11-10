import CursoForm from '../components/forms/cursoForms';
import { useNavigate } from 'react-router-dom';
import  {Curso}  from '../types/cursoType';

const CrearCurso = () => {
  const navigate = useNavigate();

  const handleCrear = async (curso: Curso) => {
    await fetch('/api/cursos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(curso),
    });
    navigate('/dashboard/maestro');
  };

  return <CursoForm onSubmit={handleCrear} />;
};

export default CrearCurso;