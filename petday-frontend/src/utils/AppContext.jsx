import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import api from '../services/api';

const AppContext = createContext();

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
            return { 
                ...state, 
                mensagem: action.payload 
            };
        case 'SET_PETS':
            return { ...state, pets: action.payload };
        case 'SET_AGENDAMENTOS':
            return { ...state, agendamentos: action.payload };
        case 'ADD_AGENDAMENTO':
            return { ...state, agendamentos: [...state.agendamentos, action.payload] };
        default:
            return state;
    }
}

export function AppProvider({ children }) { // "AppProvider" não "appProvider"
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp deve ser usado dentro de um AppProvider');
    }
    return context;
};

export const useApi = (url, options = {}) => { 
    const [data, setData] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setCarregando(true);
                setErro(null);
                const response = await api.get(url, options);
                setData(response.data);
            } catch (error) {
                setErro(error.response?.data?.error || 'Erro ao carregar dados');
            } finally {
                setCarregando(false);
            }
        };

        fetchData();
    }, [url, JSON.stringify(options)]); 

    return { data, carregando, erro, refetch: () => {
        setCarregando(true);
        fetchData();
    }};
};

export const useForm = (initialState, validations = {}) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues({
            ...values,
            [name]: type === 'checkbox' ? checked : value
        });

        setTouched({
            ...touched,
            [name]: true
        });

        if (validations[name]) {
            const error = validations[name](value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true
        });
    };

    const isValid = () => {
        const newErrors = {};
        Object.keys(validations).forEach(key => {
            const error = validations[key](values[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const reset = () => {
        setValues(initialState);
        setErrors({});
        setTouched({});
    };

    return { 
        values, 
        errors, 
        touched,
        handleChange, 
        handleBlur,
        isValid, 
        setValues,
        reset
    };
};


export const useCachedApi = (url, deps = []) => {
    const [data, setData] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setCarregando(true);
                const cachedData = cacheService.get(url);
                
                if (cachedData) {
                    setData(cachedData);
                    setCarregando(false);
                    return;
                }

                const response = await api.get(url);
                cacheService.set(url, response.data);
                setData(response.data);
            } catch (error) {
                setErro(error.response?.data?.error || 'Erro ao carregar dados');
            } finally {
                setCarregando(false);
            }
        };

        fetchData();
    }, [url, ...deps]);

    const invalidate = () => {
        cacheService.delete(url);
    };

    return { data, carregando, erro, invalidate };
};