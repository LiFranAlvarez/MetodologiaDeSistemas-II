import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './src/pages/homePage';
import Header from './src/components/layout/header';
import Footer from './src/components/layout/footer';
import RegisterPage from './src/pages/registroPages';
import LoginPage from "./src/pages/loginPages";
import CatalogoCursos from './src/pages/catalogoCursos';
import CrearCurso from './src/pages/crearCurso';
import CursoDetalle from './src/pages/cursosDetalles';
//mocks de vistas
import PerfilUsuario from './src/pages/perfilPages';
import CursoDetalleMock from './src/mocks/ejemploCursosVistaEdicion';//mock de como se ve un curso
import CatalogoCursosMock from './src/mocks/mockVistaCatalogo';

const App = () => {
  return (
      <Router>
      <Header />
      <main style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/cursos" element={<CatalogoCursos/>} />
          <Route path="/cursos/crear" element={<CrearCurso/>}/>
          <Route path="/cursos/:id" element={<CursoDetalle/>}/>        
          {/* rutas de mocks y ejemplos*/}
          <Route path="/perfil" element={<PerfilUsuario/>}/>
          <Route path="/cursos/mockVista/:id" element={<CursoDetalleMock/>}/> {/*Se ve el curso + se puede editar(si sos profesor)*/}
          <Route path="/cursos/catalogoMock" element={<CatalogoCursosMock/> }/>        
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;



