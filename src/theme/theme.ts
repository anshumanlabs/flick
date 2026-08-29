import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#070708',
            paper: '#111112',
        },
        primary: {
            main: '#49c916',
            light: '#55df1c',
            dark: '#3da912',
        },
        text: {
            primary: '#f1f1f3',
            secondary: '#a1a1aa',
        },
    },
    typography: {
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif',
        h1: {
            fontWeight: 800,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontWeight: 700,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 10,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarGutter: 'stable',
                },
            },
        },
    },
});
