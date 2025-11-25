/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext } from "react";
import { Usuario } from "../types/usuarioType";
import { getUsuarioById, updateUsuario } from "../services/usuarioServices";
import { getCursosByUser } from "../services/inscripcionesServices";
import { AuthContext } from "../context/authProviderContexto";
import "../styles/perfilUsuario.css";

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState<Usuario>({
  _id: "",
  nombre: "",
  email: "",
  rol: "ALUMNO",
});

  const [editando, setEditando] = useState(false);
  const [cursosTotales, setCursosTotales] = useState<number>(0);
  const [cursosCompletados, setCursosCompletados] = useState<number>(0);
  const [cursosEnCurso, setCursosEnCurso] = useState<number>(0);
  const [cursos, setCursos] = useState<any[]>([]);
  const auth = useContext(AuthContext);
  

  useEffect(() => {
  const fetchUsuario = async () => {
    try {
      const userId =
        auth?.user?._id ||
        localStorage.getItem("userId") ||
        sessionStorage.getItem("userId");

      console.debug("Perfil: resolved userId ->", userId);
      if (!userId) return;

      const data = await getUsuarioById(userId);
      console.log("Usuario recibido:", data);
      setUsuario(data);

      const cursosUsuario = await getCursosByUser(userId);
      console.log("Cursos recibidos:", cursosUsuario);
      setCursos(cursosUsuario);

      setCursosTotales(cursosUsuario.length);
      setCursosCompletados(
        cursosUsuario.filter((c: any) => (c.estado || c.estadoCurso) === "COMPLETADO").length
      );
      setCursosEnCurso(
        cursosUsuario.filter((c: any) => (c.estado || c.estadoCurso) === "EN CURSO").length
      );
    } catch (error) {
      console.error(error);
    }
  };

  fetchUsuario();
}, [auth?.user]);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!usuario) return;
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    try {
      if (!usuario) return;

      const payload = {
        nombre: usuario.nombre,
        email: usuario.email,
      };

      const data = await updateUsuario(usuario._id, payload);
      setUsuario(data);
      setEditando(false);
      console.log("Datos guardados:", usuario);
    } catch (error) {
      console.error(error);
    }
  };
  if (!usuario) return <p>Cargando perfil...</p>;
 
  return (
    <main className="perfil-usuario">
      <h1>Perfil de Usuario</h1>

      {/* ===================== ESTADÍSTICAS DE CURSOS ===================== */}
      <section className="perfil-estadisticas">
        <h2>Estadísticas</h2>
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-label">Cursos Totales:</span>
            <span className="stat-value">{cursosTotales}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">En Curso:</span>
            <span className="stat-value">{cursosEnCurso}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Completados:</span>
            <span className="stat-value">{cursosCompletados}</span>
          </div>
        </div>
      </section>

      {/* ===================== CURSOS DEL USUARIO ===================== */}
      <section className="perfil-cursos">
        <h2>Mis cursos</h2>

        {cursosTotales === 0 ? (
          <p>No estás inscripto en ningún curso.</p>
        ) : (
          <div className="curso-listado">
            {cursos.map((curso: any) => (
              <div key={curso._id} className="curso-card">
                <h3>{curso.titulo}</h3>
                <p>{curso.describe}</p>

                {/* ESTADO DEL CURSO */}
                <span className={`estado ${curso.estado?.toLowerCase().replace(" ", "-")}`}>
                  {curso.estado}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===================== DATOS PERSONALES ===================== */}
      <div className="perfil-card">
        <label>
          Nombre:
          {editando ? (
            <input
              type="text"
              name="nombre"
              value={usuario?.nombre?? ""}
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
              value={usuario?.email ?? ""}
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
