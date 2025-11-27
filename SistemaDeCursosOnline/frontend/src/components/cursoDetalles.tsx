import ClaseCard from "./catalogo/claseCard";
import { Clase } from "../types/claseType";
import { useContext } from "react";
import { AuthContext } from "../context/authContexto";

type Props = {
  curso: {
    titulo: string;
    docente: string | { _id: string; nombre: string }; // 👈 aceptar ambas formas
    descripcion: string;
    clases: Clase[];
  };
};

const CursoDetalle: React.FC<Props> = ({ curso }) => {
  const auth = useContext(AuthContext);
  const usuario = auth?.user;

  // Normalizar docente
  const docenteNombre =
    typeof curso.docente === "object" ? curso.docente.nombre : curso.docente;
  const docenteId =
    typeof curso.docente === "object" ? curso.docente._id : curso.docente;

  const puedeEditar =
    usuario?.rol?.toUpperCase() === "PROFESOR" && usuario?._id === docenteId;

  const esAdmin = usuario?.rol?.toUpperCase() === "ADMIN";

  return (
    <div className="curso-detalle">
      <header className="curso-header">
        <h1>{curso.titulo}</h1>
        <p>
          <strong>Docente:</strong> {docenteNombre}
        </p>
        <p>{curso.descripcion}</p>
      </header>

      <section className="clases-listado">
        {curso.clases.map((clase) => (
          <ClaseCard key={clase._id} {...clase} />
        ))}
      </section>

      {puedeEditar && (
        <button style={{ marginTop: "1rem" }}>Editar curso</button>
      )}

      {esAdmin && (
        <button style={{ marginTop: "1rem" }}>Gestionar curso</button>
      )}
    </div>
  );
};

export default CursoDetalle;