import React from "react";

import './style.css';

export default function BackgroundPoupupLayer({ component, display }) {
    return (
        <div className="background-poupup-container" style={{display: display ? 'flex' : 'none'}}>
            <div className="background-poupup-box">{component}</div>
        </div>
    );
}