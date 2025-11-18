import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Curso } from "../types/cursoType";

type UsuarioToken = {
  id: number;
  rol: "estudiante" | "docente" | "administrador";
};

const CursoDetalle = () => {
  const { id } = useParams();
  const [curso, setCurso] = useState<Curso | null>(null);
  const token = localStorage.getItem("token");
  const usuario: UsuarioToken = token ? jwtDecode(token) : { id: 0, rol: "estudiante" };

  useEffect(() => {
    const cargarCurso = async () => {
      try {
        const res = await fetch(`http://localhost:5173/cursos/${id}`);
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
      <p><strong>Docente:</strong> {curso.docente}</p>
      <p>{curso.descripcion}</p>

      <section>
        <h2>Clases</h2>
        <ul>
          {curso.clases?.map((clase) => (
            <li key={clase.id}>{clase.titulo} — {clase.fecha}</li>
          )) || <li>No hay clases aún</li>}
        </ul>
      </section>

      <section>
        <h2>Materiales</h2>
        {curso.materiales?.map((mat) => (
          <a key={mat.id} href={mat.enlace} target="_blank" rel="noopener noreferrer">
            📎 {mat.tipo}: {mat.titulo}
          </a>
        )) || <p>No hay materiales disponibles</p>}
      </section>

      {usuario.rol === "docente" && usuario.id === curso.docenteId && (
        <button style={{ marginTop: "1rem" }}>Editar curso</button>
      )}

      {usuario.rol === "administrador" && (
        <button style={{ marginTop: "1rem" }}>Gestionar curso</button>
      )}
    </main>
  );
};

export default CursoDetalle;