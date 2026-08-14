import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Skeletons from "./components/Skeletons";

const Home = lazy(() => import("./page/Home"));
const Movies = lazy(() => import("./page/Movies"));
const Favorites = lazy(() => import("./page/Favorites"));
const MovieDetails = lazy(() => import("./page/MovieDetails"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<Skeletons numberOfSkeletons={20}/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
