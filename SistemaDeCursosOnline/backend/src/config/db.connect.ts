import 'mongoose';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const mongoUrl = process.env.MONGO_URL;

export async function connectDB() {
    try {
        if (!mongoUrl) {
            throw new Error("No se encontro variable de entorno MONGO_URL");
        }
        await mongoose.connect(mongoUrl);
        console.log('DB on port ');
    } catch (error) {
        console.error('Error al conectar a DB');
        process.exit(1);
    }
}