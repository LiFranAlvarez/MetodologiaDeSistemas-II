import mongoose from "mongoose";
const { Schema, model } = mongoose;

const materialSchema = new Schema({
  titulo: String,
  tipo: String,
  enlace: String
});

export default model("Material", materialSchema);

