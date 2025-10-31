V1 - frontend

QUE AGREGUE?
Agregue el primer formulario de registro, para poner nombre email y contraseña.Ademas hay validaciones de email y longitud de la contraseña.

DONDE?
/src
├── main.tsx                  MONTA EL REACTS EN EL DOM
├── pages/ 
│   └── registroForm.tsx      ES EL FORMULARIO
├── components/
│   └── registroPage.tsx      MUESTRA EL FORMULARIO
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