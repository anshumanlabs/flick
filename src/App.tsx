import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Movies from "./page/Movies";
import Favorites from "./page/Favorites";
import MovieDetails from "./page/MovieDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
