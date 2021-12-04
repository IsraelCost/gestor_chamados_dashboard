import React, { useContext, useEffect } from "react";

import './style.css';
import userAvatarImage from '../../../assets/user-avatar.svg';

import UserContext from '../../../Context/userContext';

export default function Header() {
    const value = useContext(UserContext);
    useEffect(() => {
        console.log(value) 
     }, value);
    return (
        <header className="dashboard-header">
            <h1>Todas as chamadas</h1>
            <div className="dashboard-user-info">
                <h3 className="dashboard-user-name">{value.user.name}</h3>
                <img src={ !value.user.image ? userAvatarImage : value.user.image.url}  className="dashboard-user-avatar" />
            </div>
        </header>
    )
}