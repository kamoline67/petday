import React from 'react';
import { useApp } from '../../context/AppContext';

const NotificationSystem = () => {
    const { state, dispatch } = useApp();

    useEffect(() => {
        if (state.mensagem) {
            const timer = setTimeout(() => {
                dispatch({ type: 'SET_MENSAGEM', payload: null });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [state.mensagem]);

    if (!state.mensagem) return null;

    return (
        <div className={`fixed top-4 right-4 p-4 rounded-2xl z-50 ${
            state.mensagem.tipo === 'erro' 
                ? 'bg-red-50 text-red-700 border-2 border-red-200' 
                : 'bg-green-50 text-green-700 border-2 border-green-200'
        }`}>
            <div className="flex items-center space-x-3">
                <span className="text-xl">
                    {state.mensagem.tipo === 'erro' ? '❌' : '✅'}
                </span>
                <div>
                    <div className="font-semibold">{state.mensagem.titulo}</div>
                    <div className="text-sm">{state.mensagem.texto}</div>
                </div>
            </div>
        </div>
    );
};