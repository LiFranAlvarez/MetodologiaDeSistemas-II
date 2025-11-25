import mongoose from "mongoose";
const { Schema, model } = mongoose;

const claseSchema = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  fecha: { type: Date },
  duracion: { type: Number },
});

export default model("Clase", claseSchema);
