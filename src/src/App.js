import React, { useEffect, useState } from 'react';

import AppRoutes from './routes';

import './styles/Global.css';

import UserContext from './Context/userContext';
import api from './services/api';
import { isAuthenticated } from './services/auth';

export default function App() {
    const [user, setUser] = useState({}); 

    const getLoggedUser = async userId => {
        try {
            const user = await api.get(`/users/${userId}`);
            setUser(user.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (isAuthenticated() && Object.keys(user).length === 0) {
            getLoggedUser(localStorage.getItem('USER_ID'));
        }
    });

    return (
        <UserContext.Provider value={{ user, insertUser: obj => setUser(obj), insertSentCalls: () => {} }}>
            <AppRoutes />
        </UserContext.Provider>
    );
}