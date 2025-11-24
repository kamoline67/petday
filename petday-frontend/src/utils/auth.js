export const salvarUsuario = (token, usuario) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(usuario));
};

export const removerUsuario = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const estaLogado = () => true;

export const getUsuarioAtual = () => ({
    id: 999,
    nome:"Usuário Teste",
    email: "teste@teste.com"
});

export const getToken = () => {
    return localStorage.getItem('token');
};