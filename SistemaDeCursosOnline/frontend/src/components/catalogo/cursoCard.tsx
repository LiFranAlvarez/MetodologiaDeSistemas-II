import { Link } from 'react-router-dom';
import { Curso } from "../../types/cursoType";
import "../../styles/botonSimple.css";
import "../../styles/cursoCards.css"

const CursoCard = ({ curso }: { curso: Curso }) => (
  <div className='curso'>
    <h3>{curso.titulo}</h3>
    <p><strong>Docente:</strong> {curso.profesor.nombre}</p>
    <p><strong>Categoría:</strong> {curso.categorias}</p>
    <p>{curso.descripcion}</p>
    <Link to={`/cursos/${curso._id}`} className='curso-button'>
      <button>Ver más</button>
    </Link>
  </div>
);




export default CursoCard;