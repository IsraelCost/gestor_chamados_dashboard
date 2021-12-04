import React, { useState } from "react";

import Header from "./Header";
import Tabs from "./Tabs";
import List from "./List";
import CallForm from '../CallForm';

import './style.css';

import plusIcon from '../../assets/plus-icon.svg';

export default function ListCallsLayer({ changePoupupState, changePoupupComponent }) {
    const [activeList, setActiveList] = useState('sent');

    const hidePoupup = () => {
        changePoupupState(false);
        changePoupupComponent(null);
    };

    const handleAddButtonClick = () => {
        changePoupupState(true);
        changePoupupComponent(<CallForm hidePoupup={hidePoupup} />);
    };

    return (
        <div className="list-container">
            <Header />
            <Tabs setActiveList={setActiveList} activeList={ activeList } />
            <List activeList={activeList} changePoupupComponent={changePoupupComponent} changePoupupState={changePoupupState} />
            <div className="btn-add-call" onClick={handleAddButtonClick}>
                <img src={plusIcon} />
            </div>
        </div>
    );
}