import { Link, useLocation, useSearchParams } from "react-router-dom";
import { } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const showSearchBar = location.pathname === "/movies";
  const [, setSearchParams] = useSearchParams();

  const handleSearch = (movieName: string) => {
    setSearchParams({
      page: "1",
      search: movieName
    });
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          FLICK<span>.</span>
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/movies?page=1">Movies</Link>
          <Link to="/favorites">Favorites</Link>
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
