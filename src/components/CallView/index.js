import React from "react";

import './style.css';

export default function CallView({ hidePoupup }) {
    return (
        <div className="call-view-container">
            <h1>20/12/2021</h1>
            <h3>Número do equipamento: 455</h3>
            <h4>Descrição do chamado:</h4>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <button onClick={hidePoupup}>Fechar</button>
        </div>
    );
}