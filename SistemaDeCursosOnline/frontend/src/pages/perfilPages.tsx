import { useState } from "react";
import { Usuario } from "../types/usuarioType";
import "../styles/perfilUsuario.css"

const PerfilUsuario = () => {
  // Mock inicial (esto vendria del backend)
  const [usuario, setUsuario] = useState<Usuario>({
    id: 1,
    nombre: "Angelina",
    apellido: "Rossi",
    email: "ange@example.com",
    rol: "administrador",
  });

  const [editando, setEditando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    // PUT al backend
    console.log("Datos guardados:", usuario);
    setEditando(false);
  };

  return (
    <main className="perfil-usuario">
      <h1>Perfil de Usuario</h1>

      <div className="perfil-card">
        <label>
          Nombre:
          {editando ? (
            <input
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={handleChange}
            />
          ) : (
            <span>{usuario.nombre}</span>
          )}
        </label>

        <label>
          Email:
          {editando ? (
            <input
              type="email"
              name="email"
              value={usuario.email}
              onChange={handleChange}
            />
          ) : (
            <span>{usuario.email}</span>
          )}
        </label>

        <label>
          Rol:
          <span>{usuario.rol}</span>
        </label>

        {editando ? (
          <button onClick={handleGuardar}>Guardar</button>
        ) : (
          <button onClick={() => setEditando(true)}>✏️ Editar</button>
        )}
      </div>
    </main>
  );
};

export default PerfilUsuario;