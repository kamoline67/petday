import { useState, useEffect } from 'react';
import api from '../services/api';

export const useApi = (url, option = {}) => {
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
    }, [url]);

    return { data, carregando, erro };
};