import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ClerkProvider } from '@clerk/react';
import { dark } from '@clerk/themes';
import { FavouriteProvider } from './context/FavouriteProvider.tsx';
import { SnackbarProvider } from './context/SnackbarProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ClerkProvider appearance={dark}>
            <FavouriteProvider>
                <SnackbarProvider>
                    <App />
                </SnackbarProvider>
            </FavouriteProvider>
        </ClerkProvider>
    </StrictMode>,
);
