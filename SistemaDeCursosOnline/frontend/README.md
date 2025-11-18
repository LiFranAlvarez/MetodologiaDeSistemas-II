V1 - frontend

QUE AGREGUE?
Agregue el primer formulario de registro, para poner nombre email y contraseña.Ademas hay validaciones de email y longitud de la contraseña.

DONDE?
/src
├── main.tsx                  MONTA EL REACTS EN EL DOM
├── pages/ 
│   └── registroPages.tsx      ES EL FORMULARIO
├── components/
│   └── registroForms.tsx      MUESTRA EL FORMULARIO
├── types/
│   └── userType.ts           INTERFACE TIPEADA POR EL USUARIO
├── utils/
│   └── validacionesUtils.ts  FUNCIONES DE VALIDACION EMAIL Y CONTRASEÑA
index.html                    CONTIENE EL DIV ID="root"
App.tsx                       CARGA PAGINA PRINCIPAL  

COMO?
npm create vite@latest // elegi typescript y react+components(creo que es ese)
npm install react react-dom
npm install --save-dev typescript
npm install --save-dev @types/react
npm install --save-dev @types/node

V2 - frontend

QUE AGREGUE?
Agregue el formulario del login, con email y contraseña.Hay unas validaciones con zod.
Tambien modifique las validacion de contraseña del registro
Agregue la pagina home, e hice el header (con un logo) y el footer.
Cambie el nombre de algunas carpetas y corregi algunas falta de otrtografia.
Agregue algun que otro style(despues lo tengo ue poner bien el los css, estan en las etiquetas).

DONDE?
/src
├── components/ 
│   ├── footer.tsx
│   ├── header.tsx      
│   └── loginForm.tsx         ES EL FORMULARIO LOGIN
├── pages/
│   ├── homePages.tsx         MUESTRA LA PAGINA PRINCIPAL
│   └── loginPages.tsx        MUESTRA EL FORMULARIO LOGUIN
├── services/
│   └── authServices.ts       AUTENTICACION / LLAMA AL BACKEND PARA LOS LOGINS
├── utils/
│   └── validacionesLogin.ts  FUNCIONES DE VALIDACION EMAIL Y CONTRASEÑA CON ZOD PARA EL LOGIN
└── assets/
    └──icons/
        └──logo.png           LOGO X CREADO POR MI PARA EL PROYECTO

QUE MÁS?
npm install react-router-dom      (para hacer el header y que aparescan todo en distintas paginas)
npm install zod
npm install axion

V3- frontend

QUE AGREGUE?
Cree una pagina para los cursos, donce van a ir sus tarjetas con informacion y utilizando la barra de busqueda se puede buscar por nombre de curso/docente/categoria.
Tambien modifique el hader para que aparesca la barra de busqueda (todavia no funcional para buscar cursos desde otro lado que no sea la pagina de catalogo) y para que 
logo te lleve directamenbte al home.
Agregue paginas para crear y editar cursos. Con sus validaciones de zod
Para verlas poner “ localhost:5173/cursos/crear  ” o “ localhost:5173/cursos/editar ”
( el mock esta porque teste la barra de busqueda y funciona, pero modifique el codigo para que no se use cuando confirme que funcionaba)

DONDE?
/src
├── components/
│   ├──catalogo/
│   │   └──cursoCard.tsx
│   ├──forms/
│   │   ├── cursoForms.tsx
│   │   ├── loginForms.tsx
│   │   └── regstroForms.tsx
│   └──layout/   
│       ├── footer.tsx
│       └── header.tsx
├── context/
│   └── busquedaContexto.tsx
├── mocks/
│   └── mockCursos.ts
├── pages/
│   ├── catalogoCursos.tsx
│   ├── crearCurso.tsx
│   └── editarCurso.tsx
├── services/
│   └── cursoServices.ts    
├── types/
│   ├── cursoType.ts 
│   └── filtrosCursos.ts
└── utils/
    └── validaciones/
        ├── validacionesCursos.ts
        ├── validacionesLogin.ts
        └── validacionesRegistro.ts

QUE MAS?
version mas nueva de vite, pero creeria que no descargue nada mas.

v4- frontend

QUE AGREGUE?
Expandi el home page, le agregue unos "cursos populares" de ejemplo como para imaginar el producto final.
Agregue algunos mocks visuales, para ver como quedaria cuando se cargen los cursos y se conecte con el back.Agregue la vista de las clases individuales y la vista de los perfiles de usuario.Modifique algunos css y estilos (todavia faltan muchos). Elimine algunas cosas que se duplicaban (editarCursos), modifique nombres de archivos y agregue datos a los tipos.
Actualice el App.tsx para que muestre las nuevas rutas.Y alguna ue otra cosa en el header y otros archivos.

IMPORTANTE!! -> los mocks se introducen manualmente dependiento de su ruta.La mayoria empieza con : cursos/...

DONDE?
/src
├── components/
│   ├──catalogo/
│   │   └── claseCard.tsx                 PEQUEÑAS CAJAS DE LAS CLASES
│   └──cursoDetalles.tsx                  DETALLES INDIVDUALES DE LOS CURSOS
├── mocks/
│   ├── ejemploCursosVistaEdicion.tsx     VISTA SINGULAR DE CURSO
│   ├── mockVistaCatalogo.tsx             COMO DEBERIA SER Y FUNCIONAR EL CATALOGO
│   └── mockCursosDatos.ts                CAMBIO DE NOMBRE
├── pages/
│   ├── ELIMINE editarCursos.tsx
│   └── perfilPages.tsx                   VISTA A PERFILES DE USUARIOS
├── styles/
│   └── PASE VARIOS DE LOS ESTILOS A CSS     
└── types/                                CAMBIE NOMBRE DE FILTRO Y USER(registro)
    ├── clasesType.ts 
    ├── usuarioType.ts
    └── materialType.ts.ts

QUE MAS?
npm install jwt-decode