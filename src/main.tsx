import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ClerkProvider } from '@clerk/react';
import { dark } from '@clerk/themes';
import { FavouriteProvider } from './context/FavouriteProvider.tsx';
import { SnackbarProvider } from './context/SnackbarProvider.tsx';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme/theme.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/queryClient.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <ClerkProvider appearance={dark}>
                    <FavouriteProvider>
                        <SnackbarProvider>
                            <App />
                        </SnackbarProvider>
                    </FavouriteProvider>
                </ClerkProvider>
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>,
);
