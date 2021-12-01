import React from "react";

import './style.css';
import backIcon from '../../../assets/left.svg';
import fowardIcon from '../../../assets/right.svg';

export default function FowardPage() {
    return (
        <div className="foward-page-container">
            <img src={backIcon} className="foward-page-icon back-page" />
            <span className="foward-page-list-number">1-8 de 720</span>
            <img src={fowardIcon} className="foward-page-icon foward-page" />
        </div>
    );
}