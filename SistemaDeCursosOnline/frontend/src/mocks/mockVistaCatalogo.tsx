// pages/CatalogoCursosMock.tsx
import { useState, useEffect } from "react";
import { useBusqueda } from "../context/busquedaContexto";
import { Curso } from "../types/cursoType";
import CursoCard from "../components/catalogo/cursoCard";
import { catalogoMock } from "./mockCursosDatos";

const CatalogoCursosMock = () => {
  const { filtro } = useBusqueda();
  const [resultados, setResultados] = useState<Curso[]>(catalogoMock);

  useEffect(() => {
    const filtrados = catalogoMock.filter((curso) => {
      const textoMatch =
        !filtro.texto ||
        curso.titulo.toLowerCase().includes(filtro.texto.toLowerCase()) ||
        curso.docente.toLowerCase().includes(filtro.texto.toLowerCase()) ||
        curso.categoria.toLowerCase().includes(filtro.texto.toLowerCase());

      const categoriaMatch = !filtro.categoria || curso.categoria === filtro.categoria;
      const docenteMatch = !filtro.docente || curso.docente === filtro.docente;

      return textoMatch && categoriaMatch && docenteMatch;
    });

    setResultados(filtrados);
  }, [filtro]);

  return (
    <main style={{ background: "#c1d5ef", color: "#000000ff", padding: "1rem" }}>
      <h2>Catálogo de Cursos (Mock)</h2>
      {resultados.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          {resultados.map((curso) => (
            <CursoCard key={curso.id} curso={curso} />
          ))}
        </div>
      ) : (
        <p>No se encontraron cursos para "{filtro.texto}"</p>
      )}
    </main>
  );
};

export default CatalogoCursosMock;