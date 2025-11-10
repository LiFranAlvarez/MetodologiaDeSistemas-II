import { Curso } from "../../types/cursoType";

const CursoCard = ({ curso }: { curso: Curso }) => (
  <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", background: "#f9f9f9" }}>
    <h3>{curso.titulo}</h3>
    <p><strong>Docente:</strong> {curso.docente}</p>
    <p><strong>Categoría:</strong> {curso.categoria}</p>
    <p>{curso.descripcion}</p>
    <button style={{ marginTop: "1rem" }}>Ver más</button>
  </div>
);

export default CursoCard;