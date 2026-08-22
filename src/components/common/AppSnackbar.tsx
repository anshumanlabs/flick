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
            autoHideDuration={1000}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Alert onClose={onClose} severity={type} variant="filled" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default AppSnackbar;
