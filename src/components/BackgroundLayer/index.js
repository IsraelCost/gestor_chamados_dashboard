import React from "react";

import { Link } from 'react-router-dom';

import FowardPage from './FowardPage';

import './style.css';
import btnPersonalizateIcon from '../../assets/btn-personalizate.svg';
import btnLogoutIcon from '../../assets/btn-logout.svg';

export default function BackgroundLayer({ hasFoward }) {
    return (
        <div className="background-container">
            <div className="background-lateral-bar">
                <h1>Empresa</h1>
                <div className="background-buttons">
                    <Link to="/personalizar">
                        <div className="background-button">
                            <img src={btnPersonalizateIcon} className="icon" />
                            <h4>Personalizar</h4>
                        </div>
                    </Link>
                    <div className="background-divisor"></div>
                    <Link to="/">
                        <div className="background-button">
                            <img src={btnLogoutIcon} className="icon" />
                            <h4>Sair</h4>
                        </div>
                    </Link>
                </div>
            </div>
            
            {
                hasFoward ?
                <footer className="background-footer">
                    <FowardPage />
                </footer>
                : null
            }
            
        </div>
    );
}