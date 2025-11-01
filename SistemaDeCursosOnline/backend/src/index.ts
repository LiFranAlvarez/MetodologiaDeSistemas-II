import { Estudiante } from "./models/estudiante.js";
import { Docente } from "./models/docente.js";
import { Curso } from "./models/curso.js";

const docente1 = new Docente(1, "María", "Gómez", "maria@uni.com", "1234", "Programación Web");
const curso1 = new Curso(101, "JS101", "JavaScript Básico", "Introducción a JS", "Programación", new Date(), docente1);

const estudiante1 = new Estudiante(10, "Lucas", "Pérez", "lucas@mail.com", "abcd", "E-2025-001");

docente1.crearCurso(curso1);
curso1.agregarLeccion("Variables y tipos de datos");
estudiante1.inscribirseCurso(curso1);
curso1.obtenerInscriptos();