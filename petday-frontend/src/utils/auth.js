export const salvarUsuario = (token, usuario) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(usuario));
};

export const removerUsuario = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const estaLogado = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};

export const getUsuarioAtual = () => {
    try {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;
        
        return JSON.parse(userStr);
    } catch (error) {
        console.error('Erro ao obter usuário do localStorage:', error);
        return null;
    }
};

export const getToken = () => {
    return localStorage.getItem('token');
};