import "../../styles/claseCard.css";

type Props = {
  titulo: string;
  fecha: string;
  estado: "disponible" | "pendiente";
  materiales: {
    id: string;
    tipo: string;
    titulo: string;
    enlace: string;
  }[];
};

const ClaseCard: React.FC<Props> = ({ titulo, fecha, estado, materiales }) => {
  return (
    <div className={`clase-card ${estado}`}>
      <h3>{titulo}</h3>
      <p>Fecha: {fecha}</p>
      <span className="estado">
        {estado === "disponible" ? "Disponible" : "Pendiente"}
      </span>

      <div className="materiales">
        {materiales.map((mat) => (
          <a key={mat.id} href={mat.enlace} target="_blank" rel="noopener noreferrer">
            📎 {mat.tipo}: {mat.titulo}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ClaseCard;