import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const showSearchBar = location.pathname === "/movies";
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (query: string) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      query_term: query
    });
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="logo">
          FLICK<span>.</span>
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/movies?page=1">Movies</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
        </nav>
        {showSearchBar && (
          <div className="nav-search">
            <input
              type="text"
              placeholder="Search movies..."
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button>⌕</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
