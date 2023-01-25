import React from 'react';
import ReactDOM from 'react-dom';

// React components
import { App } from './App';
import { ModalProvider, DataProvider, AuthProvider, ThemeProvider } from './context';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <DataProvider>
                    <ModalProvider>
                        <App />
                    </ModalProvider>
                </DataProvider>
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
