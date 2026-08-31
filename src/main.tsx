import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ClerkProvider } from '@clerk/react';
import { dark } from '@clerk/themes';
import { SnackbarProvider } from './context/SnackbarProvider.tsx';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme/theme.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/queryClient.ts';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <ClerkProvider appearance={dark}>
                    <Provider store={store}>
                        <SnackbarProvider>
                            <App />
                        </SnackbarProvider>
                    </Provider>
                </ClerkProvider>
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>,
);
