/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CursoCard from "../components/catalogo/cursoCard";

const HomePage: React.FC = () => {
    const [cursos, setCursos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const resp = await fetch("http://localhost:3000/api/cursos");
                if (!resp.ok) throw new Error("No se pudieron cargar los cursos");
                
                const data = await resp.json();
                setCursos(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCursos();
    }, []);

    return (
        <main>
            <div style={{ background: "#c1d5ef", color: '#000000ff', padding: '1rem' }}>

                <h2>HOME en proceso !!! 🏗️</h2>
                <p>Fotitos con algún slogan</p>

                <section style={{
                    borderRadius: "0.5rem",
                    backgroundColor: "white",
                    padding: "1rem",
                    display: "grid",
                    flexDirection: "column",
                    alignItems: "center",
                    gridTemplateColumns: 'repeat(auto-fill)', 
                    gap: '1rem'
                }}>
                    <h2>Cursos populares</h2>

                    {loading && <p>Cargando cursos...</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                        {cursos.map((curso) => (
                            <CursoCard key={curso._id} curso={curso} />
                        ))}
                    </div>

                    <Link to="/cursos"
                        style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none' }}>
                        Ver catálogo completo
                    </Link>
                </section>

                <section>
                    <h2>¿Por qué elegirnos?</h2>
                    <ul>
                        <li>📚 Cursos actualizados y prácticos</li>
                        <li>👩‍🏫 Docentes verificados</li>
                        <li>📈 Seguimiento de tu progreso</li>
                        <li>🔒 Acceso seguro y flexible</li>
                    </ul>
                </section>

                <div>
                    <p>Preguntas frecuentes?</p>
                </div>

            </div>
        </main>
    );
};

export default HomePage;
