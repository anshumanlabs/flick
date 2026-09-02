import { Alert, Snackbar, type AlertColor } from '@mui/material';

interface AppSnackbarProps {
    open: boolean;
    message: string;
    onClose: () => void;
    type: AlertColor;
}

function AppSnackbar({ open, message, onClose, type }: AppSnackbarProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            sx={{
                '& .MuiAlert-root': {
                    borderRadius: 2,
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                },
            }}
        >
            <Alert
                onClose={onClose}
                severity={type}
                variant="filled"
                sx={{
                    width: '100%',
                    fontWeight: 600,
                    fontSize: 14,
                    '&.MuiAlert-standardError': {
                        backgroundColor: '#dc2626',
                    },
                    '&.MuiAlert-standardSuccess': {
                        backgroundColor: '#16a34a',
                    },
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

export default AppSnackbar;
