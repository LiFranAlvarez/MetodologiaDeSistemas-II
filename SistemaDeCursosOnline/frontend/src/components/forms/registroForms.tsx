import React, { useState } from 'react';
import { UserRegisterData } from '../../types/userType';
import { registerSchema } from '../../utils/validaciones/validacionesRegistro';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<UserRegisterData>({
    nombre: '',
    email: '',
    password: ''
  });

   const [errors, setErrors] = useState<{ nombre?: string; email?: string; password?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const rawErrors = result.error.flatten().fieldErrors;
      setErrors({
        nombre: rawErrors.nombre?.[0],
        email: rawErrors.email?.[0],
        password: rawErrors.password?.[0],
      });
      setSubmitted(false);
      return;
    }

    setErrors({});
    setSubmitted(true);
    console.log('Registro exitoso!', formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        background: '#c1d5ef',
        border: '1px solid #ccc',
        maxWidth: '400px',
        margin: '2rem auto',
        fontFamily: 'Montserrat',
      }}
    >
      <h2>Bienvenido!</h2>

      <label>Ingrese su nombre:</label>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
      />
      {errors.nombre && <p style={{ color: 'red' }}>{errors.nombre}</p>}

      <label>Ingrese su email:</label>
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

      <label>Ingrese su contraseña:</label>
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

      <button type="submit">Registrarse</button>

      {submitted && <p style={{ color: 'green' }}>Registro exitoso (simulado)</p>}
    </form>
  );
};


export default RegisterForm;
