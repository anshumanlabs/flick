import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ScrollToTop from './utils/ScrollToTop';
import './App.css';

const Home = lazy(() => import('./page/Home'));
const Movies = lazy(() => import('./page/Movies'));
const Favorites = lazy(() => import('./page/Favorites'));
const MovieDetails = lazy(() => import('./page/MovieDetails'));

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Suspense
                fallback={
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '300px',
                        }}
                    >
                        <CircularProgress aria-label="Loading…" sx={{ color: '#49c916' }} />
                    </Box>
                }
            >
                <ScrollToTop />
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
