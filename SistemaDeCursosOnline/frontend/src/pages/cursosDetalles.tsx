import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Curso } from "../types/cursoType";

const decodeJwt = (token: string) => {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

type UsuarioToken = {
  id: string;
  rol: "ALUMNO" | "PROFESOR" | "ADMIN";
};

const CursoDetalle = () => {
  const { id } = useParams();
  const [curso, setCurso] = useState<Curso | null>(null);

  const token = sessionStorage.getItem("token");
  const decoded = token ? decodeJwt(token) : null;

  const usuario: UsuarioToken = decoded
    ? { id: decoded._id, rol: decoded.rol }
    : { id: "0", rol: "ALUMNO" };

  useEffect(() => {
    const cargarCurso = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/cursos/${id}`);

        if (!res.ok) {
          throw new Error("No se pudo obtener el curso");
        }

        const data = await res.json();
        setCurso(data);
      } catch (error) {
        console.error("Error al cargar el curso:", error);
      }
    };

    cargarCurso();
  }, [id]);

  if (!curso) return <p>Cargando curso...</p>;

  return (
    <main style={{ padding: "2rem", background: "#f9f9f9" }}>
      <h1>{curso.titulo}</h1>

      <p><strong>Docente:</strong> {
        (typeof curso.profesor === 'object' && curso.profesor !== null)
          ? curso.profesor.nombre
          : "Sin asignar"
      }</p>
      <p>{curso.descripcion}</p>

      <section>
        <h2>Clases</h2>
        <ul>
          {curso.clases?.length
            ? curso.clases.map((clase) => (
                <li key={clase._id}>
                  {clase.titulo} — {clase.fecha}
                </li>
              ))
            : <li>No hay clases aún</li>
          }
        </ul>
      </section>

      <section>
        <h2>Materiales</h2>
        {curso.materiales?.length
          ? curso.materiales.map((mat) => (
              <a
                key={mat._id}
                href={mat.enlace}
                target="_blank"
                rel="noopener noreferrer"
              >
                📎 {mat.tipo}: {mat.titulo}
              </a>
            ))
          : <p>No hay materiales disponibles</p>
        }
      </section>

     {usuario.rol === "PROFESOR" &&
      ((typeof curso.profesor === "object" && usuario.id === curso.profesor._id) ||
      (typeof curso.profesor === "string" && usuario.id === curso.profesor)) && (
        <button style={{ marginTop: "1rem" }}>Editar curso</button>
    )}

      {usuario.rol === "ADMIN" && (
        <button style={{ marginTop: "1rem" }}>Gestionar curso</button>
      )}
    </main>
  );
};

export default CursoDetalle;
