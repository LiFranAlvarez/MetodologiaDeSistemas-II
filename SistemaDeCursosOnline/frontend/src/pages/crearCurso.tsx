import CursoForm from '../components/forms/cursoForms';
import { useNavigate } from 'react-router-dom';
import { Curso } from '../types/cursoType';
const CrearCurso = () => {
  const navigate = useNavigate();

  const handleCrear = async (curso:Curso) => {
    try {
      // Mapear los campos del formulario al formato que espera el backend
      const payload = {
        titulo: curso.titulo,
        describe: curso.descripcion,
        profesor: localStorage.getItem('profesorId') || 'ID_DEL_PROFESOR_AQUI',
        estado: 'EN CURSO',
      };

      const res = await fetch('/api/cursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Error creando curso');
      }

      // opcional: leer la respuesta
      // const creado = await res.json();
      navigate('/dashboard/maestro');
    } catch (error: any) {
      // Aquí podrías mostrar un toast o mensaje en pantalla
      console.error('Error al crear curso:', error.message || error);
      alert('No se pudo crear el curso: ' + (error.message || error));
    }
  };

  return <CursoForm onSubmit={handleCrear} />;
};

export default CrearCurso;