import { useState } from 'react';
import { Curso } from "../../types/cursoType"
import { cursoSchema } from '../../utils/validaciones/validacionesCursos';
import "../../styles/forms.css";

type Props = {
  cursoInicial?: Curso;
  onSubmit: (curso: Curso) => void;
};

const CursoForm = ({ cursoInicial, onSubmit }: Props) => {
  const [formData, setFormData] = useState<Curso>(
    cursoInicial ?? {
      codigo: 0,
      titulo: '',
      docente: '',
      descripcion: '',
      categoria: '',
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
    <form onSubmit={handleSubmit} className="forms">
      <h2>{cursoInicial ? 'Editar curso' : 'Crear nuevo curso'}</h2>

      <label>Título</label>
      <input name="titulo" value={formData.titulo} onChange={handleChange} />
      {errors.titulo && <p style={{ color: 'red' }}>{errors.titulo}</p>}

      <label>Descripción</label>
      <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
      {errors.descripcion && <p style={{ color: 'red' }}>{errors.descripcion}</p>}

      <label>Categoría</label> */Cambiar las categorias */
      <select name="categoria" value={formData.categoria} onChange={handleChange}>
        <option value="">Seleccionar</option>
        <option value="programacion">Programación</option>
        <option value="matematicas">Matemáticas</option>
        <option value="idiomas">Idiomas</option>
      </select>
      {errors.categoria && <p style={{ color: 'red' }}>{errors.categoria}</p>}

      <button type="submit" className="boton-formulario">{cursoInicial ? 'Guardar cambios' : 'Crear curso'}</button>
    </form>
  );
};

export default CursoForm;