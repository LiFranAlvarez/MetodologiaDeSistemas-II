import { Curso } from "../types/cursoType";

export const catalogoMock: Curso[] = [
  {
    id: 1,
    codigo:1,
    titulo: "Introducción a React",
    docente: "María López",
    categoria: "Frontend",
    descripcion: "Aprendé los fundamentos de React y cómo crear componentes reutilizables.",
  },
  {
    id: 2,
    codigo:2,
    titulo: "TypeScript avanzado",
    docente: "Juan Pérez",
    categoria: "Backend",
    descripcion: "Domina tipado avanzado, genéricos y buenas prácticas en proyectos grandes.",
  },
  {
    id: 3,
    codigo:3,
    titulo: "Diseño UX/UI",
    docente: "Ana Torres",
    categoria: "Diseño",
    descripcion: "Explorá principios de usabilidad, wireframes y prototipado con Figma.",
  },
];