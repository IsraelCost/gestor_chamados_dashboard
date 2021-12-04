import React, { useState } from 'react';

import AppRoutes from './routes';

import './styles/Global.css';

import UserContext from './Context/userContext';

export default function App() {
    const [user, setUser] = useState({}); 

    return (
        <UserContext.Provider value={{ user, insertUser: obj => setUser(obj) }}>
            <AppRoutes />
        </UserContext.Provider>
    );
}