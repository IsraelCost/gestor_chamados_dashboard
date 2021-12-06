export const TOKEN_KEY = '@israel_costa';

export const isAuthenticated = () => {
    return localStorage.getItem('TOKEN_KEY') !== null;
};

export const getToken = () => localStorage.getItem('TOKEN_KEY');

export const login = (token, userId) => {
    localStorage.setItem('TOKEN_KEY', token);
    localStorage.setItem('USER_ID', userId);
};

export const logout = () => {
    localStorage.removeItem('TOKEN_KEY');
    localStorage.removeItem('USER_ID');
};