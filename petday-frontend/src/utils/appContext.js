import React, { createContext, useContext, useReducer } from 'react';

const appContext = createContext();

const initialState = {
    usuario: null,
    carregando: false,
    mensagem: null,
    pets: [],
    agendamentos: [],
};

function appReducer(state, action) {
    switch (action.type) {
        case 'SET_USUARIO':
            return { ...state, usuario: action.payload };
        case 'SET_CARREGANDO':
            return { ...state, carregando: action.payload };
        case 'SET_MENSAGEM':
            return { ...state, mensagem: action.payload };
        case 'SET_PETS':
            return { ...state, pets: action.payload };
        case 'ADD_AGENDAMENTO':
            return { ...state, agendamentos: [...state.agendamentos, action.payload] };
        default:
            return state;
    }
}

export function appProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <appContext.Provider value={{ state, dispatch }}>
            {children}
        </appContext.Provider>
    );
}

export const useApp = () => useContext(appContext);