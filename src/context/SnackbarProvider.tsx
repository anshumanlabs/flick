import type { AlertColor } from '@mui/material';
import { useState, type ReactNode } from 'react';
import AppSnackbar from '../components/common/AppSnackbar';
import { SnackbarContext } from './SnackbarContext';

export function SnackbarProvider({ children }: { children: ReactNode }) {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        type: 'success' as AlertColor,
    });

    const openSnackbar = (message: string, type: AlertColor = 'success') => {
        setSnackbar({
            open: true,
            message,
            type,
        });
    };

    const close = () => {
        setSnackbar((prev) => ({
            ...prev,
            open: false,
        }));
    };

    return (
        <SnackbarContext.Provider value={{ openSnackbar }}>
            {children}
            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                type={snackbar.type}
                onClose={close}
            />
        </SnackbarContext.Provider>
    );
}
