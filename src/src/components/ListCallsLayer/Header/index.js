import React, { useContext } from "react";

import './style.css';
import userAvatarImage from '../../../assets/user-avatar.png';

import UserContext from '../../../Context/userContext';

export default function Header() {
    const { user } = useContext(UserContext);
    
    return (
        <header className="dashboard-header">
            <h1>Todas as chamadas</h1>
            <div className="dashboard-user-info">
                <h3 className="dashboard-user-name">{user.name}</h3>
                <img src={user.image && user.image.url ? user.image.url : userAvatarImage}  className="dashboard-user-avatar" alt="Avatar do usuário" />
            </div>
        </header>
    )
}