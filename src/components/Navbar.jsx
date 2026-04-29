import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useFavorites } from '../context/useFavorites';

export default function Navbar() {
  const { favorites } = useFavorites();
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark">⚔</span>
        <span className="brand-text">LoL Codex</span>
      </Link>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Inicio
        </NavLink>
        <NavLink to="/champions" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Campeones
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Favoritos <span className="badge">{favorites.length}</span>
        </NavLink>
      </div>
      <ThemeToggle />
    </nav>
  );
}
