import React, { useState } from 'react';
import { Clase } from "../../types/claseType"; 
import { claseSchema, } from '../../utils/validaciones/validacionesClases'; 
import "../../styles/forms.css";

// Definimos el tipo de datos que maneja el formulario, basándonos en Clase
type ClaseFormData = Omit<Clase, "fecha">; 

type Props = {
  claseInicial?: Clase;
  onSubmit: (clase: ClaseFormData) => void;
};

const ClaseForm = ({ claseInicial, onSubmit }: Props) => {
  
  // Inicializamos el estado. La FECHA SE OMITE deliberadamente.
  const [formData, setFormData] = useState<ClaseFormData>(
    claseInicial ?? {
      _id:"",
      titulo: "",
      estado: "PENDIENTE",
      linkGrabacion: "",
    }
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar solo los campos presentes en formData (titulo, estado, linkGrabacion)
    const result = claseSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        titulo: fieldErrors.titulo?.[0] ?? '',
        linkGrabacion: fieldErrors.linkGrabacion?.[0] ?? '',
      });
      return;
    }
    
    // Limpiar errores y enviar el objeto. 
    // Como 'fecha' no está en el objeto, el backend usará Date.now().
    setErrors({});
    onSubmit(result.data as ClaseFormData); 
  };

  return (
    <form onSubmit={handleSubmit} className="forms">
      <h2>{claseInicial ? "Editar Clase" : "Agregar Nueva Clase"}</h2>

      {/* Título (Requerido) */}
      <label htmlFor="titulo"> Título de la Clase </label>
      <input 
        id="titulo"
        name="titulo" 
        value={formData.titulo}
        onChange={handleChange}
      />
      {errors.titulo && <p className="error">{errors.titulo}</p>}

      {/* INFORMACIÓN AL USUARIO SOBRE LA FECHA */}
      <p style={{
        marginTop:'5px', 
        marginBottom:'20px', 
        fontSize:'0.9em', 
        color:'#666', 
        fontStyle:'italic'
      }}>
        * La fecha y hora de la clase se registrarán automáticamente al momento de la creación.
      </p>
      
      {/* Estado (Usará 'PENDIENTE' por defecto en Mongoose, pero es bueno mostrarlo) */}
      <label htmlFor="estado"> Estado </label>
      <select
        id="estado"
        name="estado"
        value={formData.estado}
        onChange={handleChange}
      >
        <option value="PENDIENTE">PENDIENTE</option>
        <option value="DISPONIBLE">DISPONIBLE</option>
      </select>

      {/* Link de Grabación (Opcional) */}
      <label htmlFor="linkGrabacion"> Link de Grabación (Opcional) </label>
      <input 
        id="linkGrabacion"
        name="linkGrabacion" 
        type="url"
        value={formData.linkGrabacion}
        onChange={handleChange}
        placeholder="Ej: https://youtube.com/..."
      />
      {errors.linkGrabacion && <p className="error">{errors.linkGrabacion}</p>}


      <button type="submit" className="boton-formulario">
        {claseInicial ? "Guardar Cambios" : "Crear Clase"}
      </button>
    </form>
  );
};

export default ClaseForm;