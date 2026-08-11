import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo">
          FLICK<span>.</span>
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>

        {/* Search */}
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search movies..."
          />
          <button>⌕</button>
        </div>

      </div>
    </header>
  );
}

export default Navbar;