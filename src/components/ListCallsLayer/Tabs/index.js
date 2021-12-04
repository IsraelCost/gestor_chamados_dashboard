import React from "react";

import './style.css';

export default function Tabs({ setActiveList, activeList }) {
    const handleTabClick = typeOfList => {
        setActiveList(typeOfList);
    };

    return (
        <div className="tabs-container">
            <div className="tab" onClick={() => handleTabClick('sent')} style={{ background: activeList === 'sent' ? '#F0F1F7' : '' }}>Enviadas</div>
            <div className="tab" onClick={() => handleTabClick('received')} style={{ background: activeList === 'received' ? '#F0F1F7' : '' }}>Recebidas</div>
        </div>
    );
}