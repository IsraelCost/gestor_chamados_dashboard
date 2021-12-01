import React from "react";

import './style.css';
import avatarImage from '../../../assets/user-avatar.svg'

import CallView from "../../CallView";

export default function List({ activeList, changePoupupComponent, changePoupupState }) {
    return (
        <div className="call-list-container">
            <div className="list-item" onClick={() => {
                changePoupupState(true);
                changePoupupComponent(<CallView hidePoupup={() => { 
                    changePoupupState(false);
                    changePoupupComponent(null);
                 }} />);
            }}>
                <img src={avatarImage} />
                <div className="list-item-informations">
                    <h3>Luke Lopez</h3>
                    <div className="list-item-description">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                </div>
            </div>
            <div className="list-item" onClick={() => {
                changePoupupState(true);
                changePoupupComponent(<CallView hidePoupup={() => { 
                    changePoupupState(false);
                    changePoupupComponent(null);
                 }} />);
            }}>
                <img src={avatarImage} />
                <div className="list-item-informations">
                    <h3>Luke Lopez</h3>
                    <div className="list-item-description">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                </div>
            </div>
            <div className="list-item" onClick={() => {
                changePoupupState(true);
                changePoupupComponent(<CallView hidePoupup={() => { 
                    changePoupupState(false);
                    changePoupupComponent(null);
                 }} />);
            }}>
                <img src={avatarImage} />
                <div className="list-item-informations">
                    <h3>Luke Lopez</h3>
                    <div className="list-item-description">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                </div>
            </div>
            <div className="list-item" onClick={() => {
                changePoupupState(true);
                changePoupupComponent(<CallView hidePoupup={() => { 
                    changePoupupState(false);
                    changePoupupComponent(null);
                 }} />);
            }}>
                <img src={avatarImage} />
                <div className="list-item-informations">
                    <h3>Luke Lopez</h3>
                    <div className="list-item-description">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>      
                </div>
            </div>
        </div>
    );
}