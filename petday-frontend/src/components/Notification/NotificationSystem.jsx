import React, { useEffect } from 'react';
import { useApp } from '../../utils/AppContext'

const NotificationSystem = () => {
    const { state, dispatch } = useApp();

    useEffect(() => {
        if (state.mensagem) {
            const timer = setTimeout(() => {
                dispatch({ type: 'SET_MENSAGEM', payload: null });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [state.mensagem, dispatch]);

    if (!state.mensagem) return null;

    const isError = typeof state.mensagem === 'string' 
        ? state.mensagem.includes('Erro') 
        : state.mensagem.tipo === 'erro';
    
    const titulo = typeof state.mensagem === 'string' 
        ? (isError ? 'Erro' : 'Sucesso') 
        : state.mensagem.titulo;
    
    const texto = typeof state.mensagem === 'string' 
        ? state.mensagem 
        : state.mensagem.texto;

    return (
        <div className={`fixed top-4 right-4 p-4 rounded-2xl z-50 shadow-lg ${
            isError
                ? 'bg-red-50 text-red-700 border-2 border-red-200' 
                : 'bg-green-50 text-green-700 border-2 border-green-200'
        }`}>
            <div className="flex items-center space-x-3">
                <span className="text-xl">
                    {isError ? '❌' : '✅'}
                </span>
                <div>
                    <div className="font-semibold">{titulo}</div>
                    <div className="text-sm">{texto}</div>
                </div>
                <button
                    onClick={() => dispatch({ type: 'SET_MENSAGEM', payload: null })}
                    className="ml-4 text-neutral-500 hover:text-neutral-700"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default NotificationSystem;