import React, { useContext, useEffect, useState } from "react";

import './style.css';
import avatarImage from '../../../assets/user-avatar.svg'

import CallView from "../../CallView";

import UserContext from '../../../Context/userContext';

import api from '../../../services/api';

export default function List({ activeList, changePoupupComponent, changePoupupState }) {
    const userContext = useContext(UserContext);
    const [sentCalls, setSentCalls] = useState([]);
    const [receivedCalls, setReceivedCalls] = useState([]);

    const getSentCalls = async () => {
        try {
            const calls = await api.get(`/calls/sent/user/${userContext.user.id}`);

            for (let call of calls.data) {
                const receiver = await api.get(`/users/${call.receiver_id}`);
                call["receiver"] = receiver.data;
            }

            setSentCalls(calls.data);
        } catch (error) {   
            console.error(error);
        }
    };

    const getReceivedCalls = async () => {
        try {
            const calls = await api.get(`/calls/received/user/${userContext.user.id}`);

            for (let call of calls.data) {
                const caller = await api.get(`/users/${call.caller_id}`);
                call["caller"] = caller.data;
            }

            setReceivedCalls(calls.data);
        } catch (error) {   
            console.error(error);
        }
    };

    useEffect(() => {
        getSentCalls();
        getReceivedCalls();
    }, [sentCalls]);

    return (
        <div className="call-list-container">
            {
                activeList === 'sent' ?

                sentCalls.map(call => 
                    <div typeof="sent" className="list-item" onClick={() => {
                        changePoupupState(true);
                        changePoupupComponent(<CallView hidePoupup={() => { 
                            changePoupupState(false);
                            changePoupupComponent(null);
                        }} callData={call} />);
                    }}>
                    <img src={call.receiver.image ? call.receiver.image.url : avatarImage } />
                    <div className="list-item-informations">
                        <h3>{call.receiver.name}</h3>
                        <div className="list-item-description">
                            { call.description }
                        </div>
                    </div>
                </div>
                ) : ''
            }

            {
                activeList === 'received' ?

                receivedCalls.map(call => 
                    <div typeof="received" className="list-item" onClick={() => {
                        changePoupupState(true);
                        changePoupupComponent(<CallView hidePoupup={() => { 
                            changePoupupState(false);
                            changePoupupComponent(null);
                        }} callData={call} />);
                    }}>
                    <img src={call.caller.image ? call.caller.image.url : avatarImage} />
                    <div className="list-item-informations">
                        <h3>{call.caller.name}</h3>
                        <div className="list-item-description">
                            { call.description }
                        </div>
                    </div>
                </div>
                ) : ''
            }
        </div>
    );
}