export const TOKEN_KEY = '@israel_costa';

export const isAuthenticated = () => {
    return localStorage.getItem('TOKEN_KEY') !== null;
};

export const getToken = () => localStorage.getItem('TOKEN_KEY');

export const login = token => {
    localStorage.setItem('TOKEN_KEY', token);
};

export const logout = () => {
    localStorage.removeItem('TOKEN_KEY');
};