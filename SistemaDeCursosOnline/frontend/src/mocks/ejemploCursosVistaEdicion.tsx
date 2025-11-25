import { useParams } from "react-router-dom";
import { useState } from "react";
import "../styles/cursoDetalle.css";
import "../styles/claseCard.css";

const CursoDetalleMock = () => {
  const { id } = useParams();

  // Usuario simulado
  const usuario = { id: 99, nombre: "María López", rol: "docente" };

  // Estado del curso
  const [curso, setCurso] = useState({
    id,
    titulo: "Introducción a React",
    docente: "María López",
    docenteId: 99,
    descripcion: "Aprendé los fundamentos de React y cómo crear componentes reutilizables.",
    clases: [
      { id: 1, titulo: "Componentes básicos", fecha: "2025-11-20" },
      { id: 2, titulo: "Props y estado", fecha: "2025-11-22" },
    ],
    materiales: [
      { id: "pdf1", tipo: "PDF", titulo: "Guía de React", enlace: "/materiales/react.pdf" },
      { id: "vid1", tipo: "Video", titulo: "Clase grabada", enlace: "/videos/clase1.mp4" },
    ],
  });

  const [editando, setEditando] = useState(false);

  // Cambios en título y descripción
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurso({ ...curso, [e.target.name]: e.target.value });
  };

  // Editar clases
  const handleClaseChange = (index: number, campo: string, valor: string) => {
    const nuevasClases = [...curso.clases];
    nuevasClases[index] = { ...nuevasClases[index], [campo]: valor };
    setCurso({ ...curso, clases: nuevasClases });
  };

  const agregarClase = () => {
    const nuevasClases = [...curso.clases, { id: Date.now(), titulo: "", fecha: "" }];
    setCurso({ ...curso, clases: nuevasClases });
  };

  const eliminarClase = (index: number) => {
    const nuevasClases = curso.clases.filter((_, i) => i !== index);
    setCurso({ ...curso, clases: nuevasClases });
  };

  // Editar materiales
  const handleMaterialChange = (index: number, campo: string, valor: string) => {
    const nuevosMateriales = [...curso.materiales];
    nuevosMateriales[index] = { ...nuevosMateriales[index], [campo]: valor };
    setCurso({ ...curso, materiales: nuevosMateriales });
  };

  const agregarMaterial = () => {
    const nuevosMateriales = [...curso.materiales, { id: Date.now().toString(), tipo: "", titulo: "", enlace: "" }];
    setCurso({ ...curso, materiales: nuevosMateriales });
  };

  const eliminarMaterial = (index: number) => {
    const nuevosMateriales = curso.materiales.filter((_, i) => i !== index);
    setCurso({ ...curso, materiales: nuevosMateriales });
  };

  const handleGuardar = () => {
    console.log("Curso actualizado:", curso);
    setEditando(false);
  };

  return (
    <main className="curso-detalle">
      {editando ? (
        <>
          <input
            type="text"
            name="titulo"
            value={curso.titulo}
            onChange={handleChange}
          />
          <textarea
            name="descripcion"
            value={curso.descripcion}
            onChange={handleChange}
          />
        </>
      ) : (
        <>
          <h1 className="curso-header">{curso.titulo}</h1>
          <p><strong>Docente:</strong> {curso.docente}</p>
          <p>{curso.descripcion}</p>
        </>
      )}

      <section>
        <h2>Clases</h2>
        <ul className="clases-listado">
          {curso.clases.map((clase, index) => (
            <li key={clase.id}>
              {editando ? (
                <>
                  <input
                    type="text"
                    value={clase.titulo}
                    onChange={(e) => handleClaseChange(index, "titulo", e.target.value)}
                  />
                  <input
                    type="date"
                    value={clase.fecha}
                    onChange={(e) => handleClaseChange(index, "fecha", e.target.value)}
                  />
                  <button onClick={() => eliminarClase(index)}>🗑️ Eliminar</button>
                </>
              ) : (
                `${clase.titulo} — ${clase.fecha}`
              )}
            </li>
          ))}
        </ul>
        {editando && <button onClick={agregarClase}>➕ Agregar clase</button>}
      </section>

      <section className="clase-card">
        <h2>Materiales</h2>
        <ul>
          {curso.materiales.map((mat, index) => (
            <li key={mat.id}>
              {editando ? (
                <>
                  <input
                    type="text"
                    value={mat.tipo}
                    onChange={(e) => handleMaterialChange(index, "tipo", e.target.value)}
                  />
                  <input
                    type="text"
                    value={mat.titulo}
                    onChange={(e) => handleMaterialChange(index, "titulo", e.target.value)}
                  />
                  <input
                    type="text"
                    value={mat.enlace}
                    onChange={(e) => handleMaterialChange(index, "enlace", e.target.value)}
                  />
                  <button onClick={() => eliminarMaterial(index)}>🗑️ Eliminar</button>
                </>
              ) : (
                <a className="materiales" href={mat.enlace} target="_blank" rel="noopener noreferrer">
                  📎 {mat.tipo}: {mat.titulo}
                </a>
              )}
            </li>
          ))}
        </ul>
        {editando && <button onClick={agregarMaterial}>➕ Agregar material</button>}
      </section>

      {/* Condicional por rol */}
      {usuario.rol === "docente" && usuario.id === curso.docenteId && (
        editando ? (
          <button onClick={handleGuardar}>💾 Guardar cambios</button>
        ) : (
          <button onClick={() => setEditando(true)}>✏️ Editar curso</button>
        )
      )}
    </main>
  );
};

export default CursoDetalleMock;