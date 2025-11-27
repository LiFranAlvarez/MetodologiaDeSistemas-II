import CursoForm from '../components/forms/cursoForms';
import { useNavigate } from 'react-router-dom';
import { Curso } from '../types/cursoType';

const CrearCurso = () => {
    const navigate = useNavigate();
    // 💡 OBTENER EL TOKEN Y EL ID DEL PROFESOR del contexto si es posible
    // const auth = useContext(AuthContext); 
    
    // Asumiendo que el token está en localStorage/sessionStorage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    const handleCrear = async (curso: Curso) => {
        try {
            // Se usa el profesor ID almacenado, pero es mejor usar el ID del token
            const profesorId = localStorage.getItem('profesorId') || 'ID_DE_FALLBACK';

            const payload = {
                titulo: curso.titulo,
                descripcion: curso.descripcion,
                // 💡 CORRECCIÓN: Incluir categorías
                categorias: curso.categorias, 
                profesor: profesorId, 
                estado: 'EN CURSO', // El estado inicial
            };

            const res = await fetch('/api/cursos', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    // 💡 CORRECCIÓN: Añadir el Header de Autorización
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                // Si la respuesta no tiene mensaje, usamos el status code
                const errorMessage = err.message || `Error ${res.status}: Fallo en el servidor.`; 
                throw new Error(errorMessage);
            }

            // Opcional: Obtener el ID del curso creado para navegar a sus detalles
            // const creado = await res.json(); 
            
            alert('Curso creado con éxito'); // Mensaje de éxito visible
            navigate('/dashboard/maestro');
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Error al crear curso:', error.message || error);
            alert('No se pudo crear el curso: ' + (error.message || error));
        }
    };

    return <CursoForm onSubmit={handleCrear} />;
};

export default CrearCurso;