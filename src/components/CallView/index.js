import React from "react";

import './style.css';

export default function CallView({ hidePoupup, callData }) {
    return (
        <div className="call-view-container">
            <h1>{callData.createdAt.slice(0, 10).split('-').reverse().join('-')}</h1>
            <h3>Número do equipamento: {callData.num_equip}</h3>
            <h4>Descrição do chamado:</h4>
            <p>
                { callData.description }
            </p>
            <button onClick={hidePoupup}>Fechar</button>
        </div>
    );
}