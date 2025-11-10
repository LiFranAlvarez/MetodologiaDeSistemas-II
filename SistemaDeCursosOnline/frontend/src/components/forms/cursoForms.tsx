import { useState } from 'react';
import { Curso } from "../../types/cursoType"
import { cursoSchema } from '../../utils/validaciones/validacionesCursos';

type Props = {
  cursoInicial?: Curso;
  onSubmit: (curso: Curso) => void;
};

const CursoForm = ({ cursoInicial, onSubmit }: Props) => {
  const [formData, setFormData] = useState<Curso>(
    cursoInicial ?? {
      codigo: '',
      titulo: '',
      descripcion: '',
      categoria: '',
      docente: '',
    }
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = cursoSchema.safeParse(formData);
    if (!result.success) {
      const rawErrors = result.error.flatten().fieldErrors;
      setErrors({
        titulo: rawErrors.titulo?.[0] ?? '',
        descripcion: rawErrors.descripcion?.[0] ?? '',
        categoria: rawErrors.categoria?.[0] ?? '',
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        background: '#c1d5ef',
        border: '1px solid #ccc',
        maxWidth: '400px',
        margin: '2rem auto',
      }}>
      <h2>{cursoInicial ? 'Editar curso' : 'Crear nuevo curso'}</h2>

      <label>Título</label>
      <input name="titulo" value={formData.titulo} onChange={handleChange} />
      {errors.titulo && <p style={{ color: 'red' }}>{errors.titulo}</p>}

      <label>Descripción</label>
      <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
      {errors.descripcion && <p style={{ color: 'red' }}>{errors.descripcion}</p>}

      <label>Categoría</label>
      <select name="categoria" value={formData.categoria} onChange={handleChange}>
        <option value="">Seleccionar</option>
        <option value="programacion">Programación</option>
        <option value="matematicas">Matemáticas</option>
        <option value="idiomas">Idiomas</option>
      </select>
      {errors.categoria && <p style={{ color: 'red' }}>{errors.categoria}</p>}

      <button type="submit">{cursoInicial ? 'Guardar cambios' : 'Crear curso'}</button>
    </form>
  );
};

export default CursoForm;