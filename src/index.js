import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { AppShell } from './app-shell';
import { AuthProvider } from './domains/auth';
import Routes from './routes';
import './index.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000,
        },
    },
});

ReactDOM.render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <AppShell>
                    <Routes />
                </AppShell>
            </AuthProvider>
        </QueryClientProvider>
    </BrowserRouter>,
    document.querySelector('#root')
);
