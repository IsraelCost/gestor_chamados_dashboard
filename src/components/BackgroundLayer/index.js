import React from "react";

import { Link } from 'react-router-dom';

import FowardPage from '../ButtonsForPaginate/FowardPage';

export default function BackgroundLayer() {
    return (
        <>
            <h1>Empresa</h1>
            <div className="background-buttons">
                <Link to="/personalizar">
                    <div className="button">
                        <img src="" alt="" className="icon" />
                        <h4>Personalizar</h4>
                    </div>
                </Link>
                <Link to="/">
                    <div className="button">
                        <img src="" alt="" className="icon" />
                        <h4>Sair</h4>
                    </div>
                </Link>
            </div>
            <footer>
                <FowardPage />
            </footer>
        </>
    );
}