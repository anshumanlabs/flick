import { QueryClient } from '@tanstack/react-query';

declare global {
    interface Window {
        queryClient: QueryClient;
    }
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: false,
        },
    },
});

if (import.meta.env.DEV) {
    window.queryClient = queryClient;
}
