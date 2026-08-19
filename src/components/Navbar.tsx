import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { } from "react-router-dom";
import "./Navbar.css";
import { useDebounce } from "../hooks/useDebounce";
import { useEffect, useState } from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

function Navbar() {
  const location = useLocation();
  const showSearchBar = location.pathname === "/movies";
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(
    searchParams.get("query_term") ?? ""
  );
  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    if (!showSearchBar) {
      return;
    }
    if (!debouncedSearch.trim()) {
      setSearchParams({
        page: "1"
      });
      return;
    }
    setSearchParams({
      page: "1",
      query_term: search
    });
  }, [debouncedSearch]);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="logo">
          FLICK<span>.</span>
        </NavLink>
        <nav className="nav-links">
          <div className="nav-main-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/movies?page=1">Movies</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
          </div>

          <div className="nav-auth">
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton />
            </Show>
            <div className="usericon">
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </div>
        </nav>
        {showSearchBar && (
          <div className="nav-search">
            <input
              type="text"
              placeholder="Search movies..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>⌕</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
