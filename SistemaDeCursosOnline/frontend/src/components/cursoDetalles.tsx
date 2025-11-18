import ClaseCard from "./catalogo/claseCard";
import { Clase } from "../types/claseType";

type Props = {
  curso: {
    titulo: string;
    docente: string;
    descripcion: string;
    clases: Clase[];
  };
};

const CursoDetalle: React.FC<Props> = ({ curso }) => {
  return (
    <div className="curso-detalle">
      <header className="curso-header">
        <h1>{curso.titulo}</h1>
        <p><strong>Docente:</strong> {curso.docente}</p>
        <p>{curso.descripcion}</p>
      </header>

      <section className="clases-listado">
        {curso.clases.map((clase) => (
          <ClaseCard key={clase.id} {...clase} />
        ))}
      </section>
    </div>
  );
};

export default CursoDetalle;