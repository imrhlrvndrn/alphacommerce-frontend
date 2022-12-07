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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
