import React from 'react';
import { Curso } from '../types/cursoType';
import CursoCard from '../components/catalogo/cursoCard';
import { Link } from 'react-router-dom';
import '../styles/botonSimple.css';
import "../styles/cursoCards.css";
const cursosMock: Curso[] = [
  {
    codigo:1,
    titulo: "React desde cero",
    docente: "Ana López",
    categoria: "Programación",
    descripcion: "Aprendé React paso a paso con ejemplos prácticos."
  },
  {
    codigo:2,
    titulo: "Francés práctico",
    docente: "Jean Moreau",
    categoria: "Idiomas",
    descripcion: "Curso básico de francés para viajeros y principiantes."
  },
  {
    codigo:3,
    titulo: "SQL para principiantes",
    docente: "Carlos Pérez",
    categoria: "Bases de datos",
    descripcion: "Domina las consultas SQL desde lo más básico."
  }
];


const HomePage :React.FC = () => {
    return(
    <main>
        <div style={{background: "#c1d5ef",color: '#000000ff', padding: '1rem'}}>
            <div>
                <h2>HOME en proceso !!! 🏗️ 👷🏻‍♀️ 👷🏻‍♂️</h2>
            </div>
            <div>
                <p>fotitos con algun slogan</p>
            </div>
            <section style={{borderRadius:"0.5rem",backgroundColor:"white",padding: "1rem", display:"flex",flexDirection:"column",alignItems:"center"}} >
                <h2 >Cursos populares</h2>
                <div className='cursocards'>
                {cursosMock.map((curso, index) => (
                    <CursoCard key={index} curso={curso} />
                ))}
                </div>
                <Link to="/cursos" style={{display: 'inline-block', marginTop: '1rem', textDecoration: 'none', fontFamily: 'Poppins, sans-serif'}}>
                Ver catálogo completo
                </Link>
            </section>
            <section >
            <h2 >¿Por qué elegirnos?</h2>
            <ul >
                <li>Cursos actualizados y prácticos</li>
                <li>Docentes verificados</li>
                <li>Seguimiento de tu progreso</li>
                <li>Acceso seguro y flexible</li>
            </ul>
            </section>
            <div>
                <p>preguntas frecuentes?</p>
            </div>
        </div>
    </main>
    );
};
export default HomePage;
