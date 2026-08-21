import type { AlertColor } from '@mui/material';
import { createContext, useContext } from 'react';

interface SnackbarContextType {
    openSnackbar: (message: string, type?: AlertColor) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | null>(null);

export function useSnackbar() {
    const context = useContext(SnackbarContext);

    if (!context) {
        throw new Error('useSnackbar must be used inside SnackbarProvider');
    }

    return context;
}
