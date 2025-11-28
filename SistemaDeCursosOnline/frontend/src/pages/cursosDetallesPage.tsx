import { Curso } from '../types/cursoType';
import CursoDetalle from '../components/cursoDetalles';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCursoById } from '../services/cursoServices'; 

const CursoPage = () => {
    const { idCurso } = useParams<{ idCurso: string }>();
    const [curso, setCurso] = useState<Curso | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      console.log("Curso ID cargando:", idCurso);
        if (!idCurso) return;
        

        setLoading(true);
        getCursoById(idCurso)
            .then(data => setCurso(data))
            .catch(error => console.error("Error al cargar el curso:", error))
            .finally(() => setLoading(false));
    }, [idCurso]);

    if (loading) {
        return <div>Cargando...</div>;
    }
    
    // Si no se encontró el curso después de la carga
    if (!curso) {
        return <div>⚠️ Curso no encontrado.</div>;
    }

    return <CursoDetalle curso={curso} />; 
};

export default CursoPage;