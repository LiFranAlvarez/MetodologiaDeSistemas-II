import { Curso } from "../types/cursoType"; 
import { Clase } from "../types/claseType"; 
import { Material } from "../types/materialType"; 
import { useContext , useState, useEffect} from "react"; 
import { AuthContext } from "../context/authContexto"; 
import { useNavigate } from "react-router-dom"; 
import { getCursosByUser, inscribirCurso, abandonarCurso, completarCurso } from "../services/inscripcionesServices"; 
import { Inscripcion, EstadoInscripcion } from "../types/inscripcionType"; 
import "../styles/cursoVista.css"; 

type Props = {
   curso: Curso, 
  }
const CursoDetalle: React.FC<Props> = ({ curso }) => {
  const auth = useContext(AuthContext); 
  const usuario = auth?.user; 
  const navigate =useNavigate(); 
  const [isEditing, setIsEditing]=useState(false);
  const [estado, setEstado] = useState<EstadoInscripcion | "NO_INSCRIPTO">("NO_INSCRIPTO");
  // Normalizar 
    const profesorObj = typeof curso.profesor === "object" ? curso.profesor : null;
    const profesorId = profesorObj ? profesorObj._id : curso.profesor;
    
    // Roles y permisos
    const esProfesor = usuario?.rol?.toUpperCase() === "PROFESOR";
    const puedeEditar = esProfesor && usuario?._id === profesorId;
    const esAdmin = usuario?.rol?.toUpperCase() === "ADMIN";
    const esAlumno = usuario?.rol?.toUpperCase() === "ALUMNO";
  
  useEffect(() => { 
    if (!usuario||!esAlumno) {
      return
    }else (getCursosByUser(usuario._id!) as Promise<Inscripcion[]>)
        .then(inscripciones => {
          const inscripcionEncontrada = inscripciones.find(i => 
            (i.curso as Curso)._id === curso._id
          );
          if (!inscripcionEncontrada) {
            return setEstado("NO_INSCRIPTO");
          }

      setEstado(inscripcionEncontrada.estado); 
    });
  }, [usuario, curso._id, esAlumno]);
  const handleInscribirse = async () => { 
    console.log("Intentando inscribirse:", { 
      cursoId: curso._id, usuarioId: usuario?._id 
    }); 
    if (!usuario || !curso._id) { 
      alert("Necesitas iniciar sesión para inscribirte."); 
      return; 
    } try { 
      await inscribirCurso(curso._id, usuario._id); 
      setEstado("EN_PROCESO"); 
    } catch (error) { 
      console.error("Error al inscribirse:", error); 
      alert("Hubo un error al procesar la inscripción."); 
    } 
  };
  const handleAbandonar = async () => { 
    if (!usuario || !curso._id) { 
      alert("No se pudo procesar la solicitud. Usuario no identificado."); 
      return; 
    } try { 
      await abandonarCurso(curso._id!, usuario._id!); 
      setEstado("ABANDONADA"); 
    } catch (error) { 
      console.error("Error al abandonar:", error); 
      alert("Hubo un error al abandonar el curso."); 
    } 
  };
  const handleTerminar = async () => { 
    if (!usuario || !curso._id) { 
      alert("No se pudo procesar la solicitud. Usuario no identificado."); 
      return; } try { 
        await completarCurso(curso._id!, usuario._id!); 
        setEstado("TERMINADA"); 
      } catch (error) { 
          console.error("Error al finalizar:", error); 
          alert("Hubo un error al finalizar el curso."); 
        } 
  }; 
  const contenidoVisible = !esAlumno || estado !== "NO_INSCRIPTO"; 
  return (
    <div className="curso-detalle-container">
      {/* ===================== HEADER ===================== */}
      <header className="curso-header-centered">
        <h1 className="curso-titulo">{curso.titulo}</h1> {/* Título Centrado */}
          <p className="curso-descripcion">{curso.descripcion || "Sin descripción disponible"}</p> {/* Descripción */}
          <p className="curso-docente">Docente: <strong>{typeof curso.profesor === "string" ? curso.profesor : curso.profesor?.nombre || "Sin Asignar"}</strong></p>
                
          {/* 💡 Botones de Edición para Profesor/Admin */}
          {(puedeEditar || esAdmin) && (
            <div className="btn-group-profesor">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={isEditing ? 'btn-cancelar-edicion' : 'btn-editar-curso'}
            >
              {isEditing ? "❌ Finalizar Edición" : "✏️ Editar Curso"}
            </button>
            </div>
          )}
            {/* 💡 Botones de Acción Global de Profesor (Aparecen al Editar) */}
          {isEditing && (
            <div className="btn-group-acciones">
              <button onClick={() => navigate(`/editar/curso/${curso._id}`)}>Editar Datos</button>
              <button onClick={() => navigate(`/curso/${curso._id}/nueva-clase`)}>Agregar Clase</button>
              <button onClick={() => navigate(`/curso/${curso._id}/nuevo-material`)}> Agregar Material</button>
              <button className="btn-cancelar-edicion">🗑 Eliminar Curso</button>
            </div>
          )}
      </header>
        {/* ===================== ALUMNO: BOTONES DE ACCIÓN ===================== */}
      {esAlumno && (
        <div className="alumno-acciones">
          {estado === "NO_INSCRIPTO" && (
            <button onClick={handleInscribirse} className="btn-inscripcion">
              Inscribirme al Curso
            </button>
          )}

          {(estado === "EN_PROCESO" || estado === "ABANDONADA" || estado === "TERMINADA") && (
            <p className="estado-actual">
              <strong>Estado:</strong> {estado.replace('_', ' ')}
            </p>
          )}

          {estado === "EN_PROCESO" && (
            <div className="alumno-opciones">
               <button onClick={handleAbandonar} className="btn-abandonar">Abandonar</button>
              <button onClick={handleTerminar} className="btn-finalizar">Finalizar curso</button>
             </div>
          )}
                    
          {estado === "ABANDONADA" && (
            <button onClick={handleInscribirse} className="btn-reinscribir">🔄 Reinscribirme</button>
          )}
        </div>
      )}
            
       {/* ===================== CONTENIDO DEL CURSO ===================== */}
        <div className="curso-contenido-wrapper">
          {contenidoVisible ? (
            <>
              <section className="seccion-clases">
                <h2>📚 Clases ({curso.clases?.length || 0})</h2>
                <ul className="clases-list">
                  {curso.clases?.map((clase:Clase) => (
                    <li key={clase._id} className="clase-row">
                        <small className="clase-fecha">
                          {clase.fecha ? new Date(clase.fecha).toLocaleDateString(): "Fecha sin asignar"}
                        </small>
                    {/* 💡 INPUT DE LINK (SOLO EDICIÓN DEL PROFESOR) */}
                      <div className="clase-link">
                        <label>Link de Grabación</label>
                            <input 
                              type="text"
                              // Asumimos que Clase tiene un campo 'linkGrabacion'
                              defaultValue={clase.linkGrabacion || ''}
                              placeholder="URL del video de la clase"
                              disabled={!puedeEditar || !isEditing}
                              className={isEditing ? 'input-editable' : 'input-readonly'}
                            />
                            {/* Opcional: Botón de editar/eliminar clase aquí */}
                              {isEditing && (
                                <button className="btn-eliminar-clase">🗑️</button>
                            )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
    
              <section className="seccion-materiales">
                <h2>📎 Materiales ({curso.materiales?.length || 0})</h2>
                <div className="materiales-grid">
                  {curso.materiales?.map((m: Material) => (
                    <div key={m._id} className="material-item-row">
                      <a href={m.enlace} target="_blank" rel="noopener noreferrer">
                          <small className="material-fecha">
                            {m.fechaSubida ? new Date(m.fechaSubida).toLocaleDateString(): (m.tipo || '')}
                          </small>
                      </a>
                      {isEditing && (
                        <button className="btn-eliminar-material">Eliminar</button>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : (
                    <p className="bloqueo-contenido">
                        🔒 Debes inscribirte para acceder a las clases y materiales.
                    </p>
          )}
        </div>

    </div>
    );
};

export default CursoDetalle;