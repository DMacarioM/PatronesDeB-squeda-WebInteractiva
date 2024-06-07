import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/BD">Busqueda Directa</Link></li>
        <li><Link to="/KMP">KMP</Link></li>
        <li><Link to="/BM">Boyer-Moore</Link></li>
        <li><Link to="/Sandbox">Sandbox</Link></li>
      </ul>
    </nav>
  );
}
export default Navbar;