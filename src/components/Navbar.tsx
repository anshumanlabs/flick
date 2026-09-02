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

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleNavigation = (path: string) => {
        setSearch('');
        navigate(path);
        setAnchorElNav(null);
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: 'rgba(7, 7, 8, 0.92)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid #222',
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

                                '&:hover': {
                                    color: '#fff',
                                    backgroundColor: 'rgba(255,255,255,0.06)',
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
                                        mt: 1,
                                        minWidth: 180,
                                        backgroundColor: '#111112',
                                        backgroundImage: 'none',
                                        border: '1px solid #292929',
                                        borderRadius: 2,
                                    },
                                },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    onClick={() => handleNavigation(page.path)}
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
                                            px: 2,
                                            py: 1.2,

                                            color: '#fff',
                                            fontSize: 15,
                                            fontWeight: 500,
                                            textDecoration: 'none',

                                            '&:hover': {
                                                color: '#fff',
                                                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                                            },

                                            '&.active': {
                                                color: '#49c916',
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
                                xs: 20,
                                sm: 22,
                                md: 26,
                            },
                            fontWeight: 800,
                            letterSpacing: {
                                xs: 1.5,
                                md: 2,
                            },
                            flexShrink: 0,
                        }}
                    >
                        FLICK
                        <Box
                            component="span"
                            sx={{
                                color: '#49c916',
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
                            gap: 2,
                            flex: 1,
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page.path}
                                component={NavLink}
                                to={page.path}
                                onClick={() => handleNavigation(page.path)}
                                sx={{
                                    color: '#fff',
                                    fontSize: 15,
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    minWidth: 'auto',
                                    px: 1,

                                    '&:hover': {
                                        color: '#fff',
                                        backgroundColor: 'transparent',
                                    },

                                    '&.active': {
                                        color: '#49c916',
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
                            borderRadius: 2,
                            overflow: 'hidden',
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
                                    xs: 1,
                                    sm: 1.5,
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
                                }
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
                                    width: 35,
                                    height: 35,
                                    border: '1px solid rgba(255,255,255,0.276)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
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
