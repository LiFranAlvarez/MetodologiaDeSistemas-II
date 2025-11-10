import { Link } from 'react-router-dom';
import { useBusqueda } from "../../context/busquedaContexto";


const Header = () => {
  const { filtro, setFiltro } = useBusqueda();

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
    {/* Logo */}
    <Link to="/">
      <img src="/src/assets/icons/logo.png" alt="Logo" style={{ height: '50px', borderRadius: '100px' }} />
    </Link>
    <nav style={{display:"flex", gap:"1rem",}}>
      <Link to="/cursos">Catalogo</Link> 
    </nav>
    <input
        type="text"
        placeholder="Buscar cursos..."
        value={filtro.texto}
        onChange={(e) => setFiltro({ ...filtro, texto: e.target.value })}
        style={{
        padding: '0.5rem',
        borderRadius: '8px',
        border: 'none',
        flex: 1,
        maxWidth: '500px',
        minWidth:"150px",
      }}
    />
    {/* Links */}
      <nav style={{display:"flex", gap:"1rem",}}>
        <Link to="/registro">Registro</Link> <Link to="/auth/login">Login</Link>
      </nav>

    
  </header>
)};
export default Header;