import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from "../../utils/validaciones/validacionesLogin";
import { login } from '../../services/authServices';
import "../../styles/forms.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({});
    setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const rawErrors = result.error.flatten().fieldErrors;
      setFieldErrors({
        email: rawErrors.email?.[0],
        password: rawErrors.password?.[0],
      });
      return;
    }

    try {
      const response = await login(formData);
      localStorage.setItem('token', response.token);

      switch (response.user.rol) {
        case 'alumno':
          navigate('/dashboard/alumno');
          break;
        case 'maestro':
          navigate('/dashboard/maestro');
          break;
        case 'admin':
          navigate('/dashboard/admin');
          break;
        default:
          navigate('/');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message || 'Error al iniciar sesión');
      } else {
        setServerError('Error desconocido');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="forms">
      <h2>Iniciar sesión</h2>

      <label>Ingrese su email:</label>
      <input name="email" type="email" value={formData.email} onChange={handleChange} />
      {fieldErrors.email && <p style={{ color: 'red' }}>{fieldErrors.email}</p>}

      <label>Ingrese su contraseña:</label>
      <input name="password" type="password" value={formData.password} onChange={handleChange} />
      {fieldErrors.password && <p style={{ color: 'red' }}>{fieldErrors.password}</p>}

      {serverError && <p style={{ color: 'red' }}>{serverError}</p>}

      <button type="submit" className="boton-formulario">Ingresar</button>
    </form>
  );
};

export default LoginForm;