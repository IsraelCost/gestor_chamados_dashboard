import React, { useContext } from "react";
import api from "../../../../services/api";

import iconDelete from '../../../../assets/icon-delete.svg';

import UserContext from "../../../../Context/userContext";

import './style.css';

export default function ButtonDeleteCall({ callId }) {
    const userContext = useContext(UserContext);
    
    const updateCalls = async () => {
        try {
            const calls = await api.get(`/calls/sent/user/${userContext.user.id}`);

            for (let call of calls.data) {
                const receiver = await api.get(`/users/${call.receiver_id}`);
                call["receiver"] = receiver.data;
            }

            userContext.insertSentCalls(calls.data);
        } catch (error) {   
            console.error(error);
        }
    };

    const handlerDelete = async e => {
        try {
            e.stopPropagation();
            await api.delete(`/calls/${callId}`);
            updateCalls();
        } catch (error) {   
            console.error(error);
        }
    };

    return (
        <div className="btn-delete-call" onClick={handlerDelete}>
            <img id="icon-delete" src={iconDelete} alt="Deletar" />
        </div>
    );
}