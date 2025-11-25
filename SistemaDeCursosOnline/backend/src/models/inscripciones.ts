import {Schema, model} from 'mongoose';

const inscripcionSchema = new Schema({
    // ID de curso a inscribir
    cursoId : {
        type : Schema.Types.ObjectId,
        ref : 'Curso',
        required : true
    },
    // ID de usuario (ALUMNO) inscripto 
    usuarioId : {
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : true
    },
    fechaInscripcion : {
        type : Date,
        default : Date.now
    },
    estadoInscripcion : {
        type : String,
        enum : ['ACTIVA' , 'CANCELADA'],
        default : 'ACTIVA'
    }
});
inscripcionSchema.index({ cursoId: 1, usuarioId: 1 }, { unique: true });

export default model('Inscripcion', inscripcionSchema);