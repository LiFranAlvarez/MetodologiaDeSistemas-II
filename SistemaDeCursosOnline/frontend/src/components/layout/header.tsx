import { Link, useNavigate } from 'react-router-dom';
import { useBusqueda } from "../../context/busquedaContexto";
import "../../styles/botonesHeader.css"
import "../../styles/botonCatalogo.css"
import { AuthContext } from '../../context/authProviderContexto';
import { useContext } from 'react';
const Header = () => {
  const { filtro, setFiltro } = useBusqueda();
  const auth= useContext(AuthContext);
  const navigate=useNavigate();

  const handleLogout=()=>{
    auth?.logout();
    navigate('/');
  }
  return (
  <header style={{
      background: "#c1d5ef",
      marginTop: '0.2rem', 
      padding: '1rem 2rem',
      display:"flex",
      alignItems:"center", 
      justifyContent:"space-between", 
      borderRadius:"50px",
      flexWrap:"wrap",
      gap:"1rem"
    }}>
    <Link to="/">
      <img src="/src/assets/icons/logo.png" alt="Logo" style={{ height: '50px', borderRadius: '100px' }} />
    </Link>
    <div className="busqueda-con-catalogo">
  <input
    type="text"
    id="buscar-cursos"
    name="buscarCursos"
    placeholder="Buscar cursos..."
    value={filtro.texto}
    onChange={(e) => setFiltro({ ...filtro, texto: e.target.value })}
    className="search__input"
    autoComplete="on"
  />
  <Link to="/cursos" className="catalogo-link">Ver catálogo</Link>
</div>
    <nav className="header-links">
        {!auth?.user ? (
          <>
             <Link to="/registro" className='register'>Registro</Link>
             <Link to="/auth/login" className='login'>Login</Link>
          </>
        ) : (
          <>
            <Link to="/perfil" className='login'>Perfil</Link>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        )}
    </nav>
  </header>
)};
export default Header;