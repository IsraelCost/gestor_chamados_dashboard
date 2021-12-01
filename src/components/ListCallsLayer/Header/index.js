import React from "react";

import './style.css';
import userAvatarImage from '../../../assets/user-avatar.svg';

export default function Header() {
    return (
        <header className="dashboard-header">
            <h1>Todas as chamadas</h1>
            <div className="dashboard-user-info">
                <h3 className="dashboard-user-name">Samuel Ismael</h3>
                <img src={userAvatarImage}  className="dashboard-user-avatar" />
            </div>
        </header>
    )
}