import { createContext, useContext, useReducer } from 'react';
import { initial_data_state, data_reducers } from '../';

const DataContext = createContext();

export const useDataLayer = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    return (
        <DataContext.Provider value={useReducer(data_reducers, initial_data_state)}>
            {children}
        </DataContext.Provider>
    );
};
