/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext } from "react";
import { Usuario } from "../types/usuarioType";
import { getUsuarioById, updateUsuario } from "../services/usuarioServices";
import { getCursosByUser } from "../services/inscripcionesServices";
import { AuthContext } from "../context/authContexto";
import "../styles/perfilUsuario.css";
import "../styles/botonSimple.css"

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
        let userId = auth?.user?._id;
      // Si no hay userId del context, usar sessionStorage
      if (!userId) {
        userId = localStorage.getItem("userId") || "";
      }
      if (!userId) {
        console.warn("No hay userId disponible");
        return;
      }
      const data = await getUsuarioById(userId);
      setUsuario({
        ...data,
        nombre: data.nombre ?? "",
        email: data.email ?? "",
      });

        const cursosUsuario = await getCursosByUser(userId);
        setCursos(cursosUsuario);
        setCursosTotales(cursosUsuario.length);
        setCursosCompletados(cursosUsuario.filter((c:any) => (c.estado || c.estadoCurso) === 'COMPLETADO').length);
        setCursosEnCurso(cursosUsuario.filter((c:any) => (c.estado || c.estadoCurso) === 'EN CURSO').length);
      } catch (err) {
        console.error(err);
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
      const updated = await updateUsuario(usuario._id, { nombre: usuario.nombre, email: usuario.email });
      
      setUsuario(updated);
      
      // Mantiene la sesión actualizada
      auth?.setUser(updated); 

      setEditando(false);
    } catch (err) {
      console.error(err);
    }
  };
  if (!usuario) return <p>Cargando perfil...</p>;
 
  return (
    <main className="perfil">
      <h1>Perfil de Usuario</h1>
      {/* ===================== DATOS PERSONALES ===================== */}
      <div className="perfil-card">
        <h2>Informacion personal:</h2>
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

        
      </div>
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
          <div className="curso-curso-grid">
            {cursos.map(c => (
            <div className="curso-card" key={c._id}>
              <h3>{c.titulo}</h3>
              <span className={`estado ${c.estado?.toLowerCase().replace(' ', '-')}`}>{c.estado}</span>
            </div>
            ))}
          </div>
        )}
      </section>

      {editando ? (
          <button onClick={handleGuardar} className="btn-edit">Guardar</button>
        ) : (
          <button onClick={() => setEditando(true)}>✏️ Editar</button>
        )}
    </main>
  );
};

export default PerfilUsuario;
