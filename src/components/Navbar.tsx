import { useEffect, useState } from 'react';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Show, SignInButton, UserButton } from '@clerk/react';
import { useDebounce } from '../hooks/useDebounce';

const pages = [
    { label: 'Home', path: '/' },
    { label: 'Movies', path: '/movies?page=1' },
    { label: 'Favorites', path: '/favorites' },
];

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('query_term') ?? '');
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [scrolled, setScrolled] = useState(false);
    const debouncedSearch = useDebounce(search, 1000);

    useEffect(() => {
        const currentQuery = searchParams.get('query_term') ?? '';
        if (!debouncedSearch.trim()) {
            if (currentQuery) {
                setSearchParams({
                    page: '1',
                });
            }
            return;
        }
        if (location.pathname !== '/movies') {
            navigate(`/movies?page=1&query_term=${encodeURIComponent(debouncedSearch)}`);
            return;
        }
        setSearchParams({
            page: '1',
            query_term: debouncedSearch,
        });
    }, [debouncedSearch]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: scrolled ? 'rgba(7, 7, 8, 0.95)' : 'rgba(7, 7, 8, 0.85)',
                backdropFilter: scrolled ? 'blur(16px)' : 'blur(12px)',
                borderBottom: scrolled ? '1px solid #1f1f23' : '1px solid #222',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.5)' : 'none',
            }}
        >
            <Container
                maxWidth={false}
                sx={{
                    maxWidth: 1400,
                    mx: 'auto',
                    px: {
                        xs: 2,
                        sm: 3,
                        md: 3.75,
                    },
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: {
                            xs: 64,
                            md: 72,
                        },
                        gap: {
                            xs: 1,
                            sm: 2,
                            md: 3,
                        },
                        transition: 'min-height 0.3s ease',
                    }}
                >
                    <Box
                        sx={{
                            display: {
                                xs: 'block',
                                md: 'none',
                            },
                        }}
                    >
                        <IconButton
                            onClick={handleOpenNavMenu}
                            sx={{
                                color: '#fff',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    color: '#fff',
                                    backgroundColor: 'rgba(73, 201, 22, 0.12)',
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            {anchorElNav ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>

                        <Menu
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            slotProps={{
                                paper: {
                                    sx: {
                                        mt: 1.5,
                                        minWidth: 200,
                                        backgroundColor: '#111112',
                                        backgroundImage: 'none',
                                        border: '1px solid #292929',
                                        borderRadius: 3,
                                        boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
                                        animation: 'fadeInUp 0.2s ease forwards',
                                    },
                                },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        p: 0,
                                    }}
                                    key={page.label}
                                >
                                    <Box
                                        component={NavLink}
                                        to={page.path}
                                        sx={{
                                            width: '100%',
                                            px: 2.5,
                                            py: 1.5,
                                            color: '#fff',
                                            fontSize: 15,
                                            fontWeight: 500,
                                            textDecoration: 'none',
                                            transition: 'all 0.2s ease',
                                            position: 'relative',

                                            '&:hover': {
                                                color: '#fff',
                                                backgroundColor: 'rgba(73, 201, 22, 0.08)',
                                            },

                                            '&.active': {
                                                color: '#49c916',
                                                backgroundColor: 'rgba(73, 201, 22, 0.06)',
                                            },
                                        }}
                                    >
                                        {page.label}
                                    </Box>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        component={NavLink}
                        to="/"
                        sx={{
                            color: '#fff',
                            textDecoration: 'none',
                            fontSize: {
                                xs: 22,
                                sm: 24,
                                md: 28,
                            },
                            fontWeight: 800,
                            letterSpacing: {
                                xs: 1.5,
                                md: 2,
                            },
                            flexShrink: 0,
                            transition: 'opacity 0.2s ease',
                            '&:hover': {
                                opacity: 0.85,
                            },
                        }}
                    >
                        FLICK
                        <Box
                            component="span"
                            sx={{
                                color: '#49c916',
                                textShadow: '0 0 20px rgba(73, 201, 22, 0.5)',
                            }}
                        >
                            .
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: {
                                xs: 'none',
                                md: 'flex',
                            },
                            alignItems: 'center',
                            gap: 1,
                            flex: 1,
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page.path}
                                component={NavLink}
                                to={page.path}
                                sx={{
                                    color: '#a1a1aa',
                                    fontSize: 15,
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    minWidth: 'auto',
                                    px: 1.5,
                                    py: 1,
                                    position: 'relative',
                                    borderRadius: 2,
                                    transition: 'all 0.25s ease',

                                    '&:hover': {
                                        color: '#fff',
                                        backgroundColor: 'transparent',
                                    },

                                    '&.active': {
                                        color: '#49c916',
                                        backgroundColor: 'rgba(73, 201, 22, 0.08)',
                                    },

                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 4,
                                        left: '50%',
                                        transform: 'translateX(-50%) scaleX(0)',
                                        width: '60%',
                                        height: '2px',
                                        backgroundColor: '#49c916',
                                        borderRadius: 2,
                                        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                    },

                                    '&.active::after': {
                                        transform: 'translateX(-50%) scaleX(1)',
                                    },
                                }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>

                    <Box
                        sx={{
                            width: {
                                xs: 'auto',
                                sm: 220,
                                md: 260,
                            },
                            flex: {
                                xs: 1,
                                sm: '0 1 220px',
                                md: '0 1 260px',
                            },
                            minWidth: 0,

                            backgroundColor: '#151516',
                            border: '1px solid #292929',
                            borderRadius: 2.5,
                            overflow: 'hidden',
                            transition: 'all 0.25s ease',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',

                            '&:focus-within': {
                                borderColor: '#49c916',
                                boxShadow: '0 0 0 3px rgba(73, 201, 22, 0.12), 0 2px 8px rgba(0,0,0,0.2)',
                            },
                        }}
                    >
                        <Box
                            component="input"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search movies..."
                            sx={{
                                width: '100%',
                                boxSizing: 'border-box',

                                px: {
                                    xs: 1.5,
                                    sm: 2,
                                },
                                py: {
                                    xs: 1,
                                    sm: 1.2,
                                },

                                background: 'transparent',
                                border: 'none',
                                outline: 'none',

                                color: '#fff',
                                fontSize: {
                                    xs: 12,
                                    sm: 13,
                                    md: 14,
                                },

                                '&::placeholder': {
                                    color: '#555',
                                    transition: 'color 0.2s ease',
                                },

                                '&:focus::placeholder': {
                                    color: '#777',
                                },
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexShrink: 0,
                            ml: 'auto',
                        }}
                    >
                        <Show when="signed-out">
                            <SignInButton />
                        </Show>

                        <Show when="signed-in">
                            <Box
                                sx={{
                                    width: 36,
                                    height: 36,
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.25s ease',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        borderColor: '#49c916',
                                        boxShadow: '0 0 0 3px rgba(73, 201, 22, 0.15)',
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <UserButton />
                            </Box>
                        </Show>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
