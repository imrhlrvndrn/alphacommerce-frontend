import { createContext, useContext, useReducer } from 'react';
import { initial_auth_state, auth_reducers } from '../';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={useReducer(auth_reducers, initial_auth_state)}>
            {children}
        </AuthContext.Provider>
    );
};
