import { Curso } from "../types/cursoType";

export const catalogoMock: Curso[] = [
  {
    _id: "1",
    titulo: "Introducción a React",
    profesor: "María López",
    categorias: ["Frontend"],
    descripcion: "Aprendé los fundamentos de React y cómo crear componentes reutilizables.",
  },
  {
    _id: "2",
    titulo: "TypeScript avanzado",
    profesor: "Juan Pérez",
    categorias: ["Backend"],
    descripcion: "Domina tipado avanzado, genéricos y buenas prácticas en proyectos grandes.",
  },
  {
    _id: "3",
    titulo: "Diseño UX/UI",
    profesor: "Ana Torres",
    categorias: ["Diseño"],
    descripcion: "Explorá principios de usabilidad, wireframes y prototipado con Figma.",
  },
];