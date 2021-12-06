import React from "react";

import './style.css';

import iconError from '../../assets/error-icon.svg';

export default function Error({ errorMessage, hidePoupup }) {
    const handleCloseModal = () => {
        hidePoupup();
    };

    return (
        <div className="error-container">
            <img src={iconError} alt="Erro" />
            <div className="error-message">{errorMessage}</div>
            <button id="close" onClick={handleCloseModal}>Fechar</button>
        </div>
    );
}