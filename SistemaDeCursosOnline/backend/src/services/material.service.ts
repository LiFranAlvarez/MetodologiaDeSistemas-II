import Material from "../models/material.schema";

export const getMateriales = async () => {
  return await Material.find();
};

export const getMaterialById = async (id: string) => {
  return await Material.findById(id);
};

export const createMaterial = async (data: any | any[]) => {
    // 💡 VERIFICACIÓN CLAVE: Si recibimos un array, usamos insertMany
    if (Array.isArray(data)) {
        return await Material.insertMany(data);
    }
    
    // Si no es un array, se comporta como antes (para un solo material)
    const material = new Material(data);
    return await material.save();
};

export const updateMaterial = async (id: string, data: any) => {
  return await Material.findByIdAndUpdate(id, data, { new: true });
};

export const deleteMaterial = async (id: string) => {
  return await Material.findByIdAndDelete(id);
};
