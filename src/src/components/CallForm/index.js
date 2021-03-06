import React, { useRef, useState, useContext, useEffect } from "react";

import './style.css';

import FormValidate from '../../services/FormValidate';
import UserContext from "../../Context/userContext";

import Error from "../Error";

import api from '../../services/api'

export default function CallForm({ hidePoupup, changePoupupComponent, changePoupupState }) {
    const userContext = useContext(UserContext);

    const numEquipRef = useRef('');
    const descriptionRef = useRef('');
    const receiverRef = useRef('');

    const [inputErrors, setInputErrors] = useState([]);
    const [users, setUsers] = useState([]);

    const validator = new FormValidate([]);

    const openErrorModal = () => {
        changePoupupState(true);
        changePoupupComponent(<Error errorMessage="Ocorreu um erro no servidor" hidePoupup={hidePoupup} />);
    };

    const handleSubmit = e => {
        e.preventDefault();

        const formData = [
            { name: numEquipRef.current.name, value: numEquipRef.current.value },
            { name: descriptionRef.current.name, value: descriptionRef.current.value },
            { name: receiverRef.current.name, value: receiverRef.current.options[receiverRef.current.selectedIndex].value },
        ];

        validator.data = formData;

        validator.hasNullableValue();

        setInputErrors(validator.errors);

        if (inputErrors.length === 0) {
            const callData = {
                num_equip: Number(numEquipRef.current.value),
                description: descriptionRef.current.value,
                caller_id: userContext.user.id,
                receiver_id: Number(receiverRef.current.options[receiverRef.current.selectedIndex].value)
            };

            sendCall(callData);
        }
    };

    const handleCancelForm = () => {
        hidePoupup();
    };

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
            openErrorModal();
        }
    };

    const getUsersToCall = async () => {
        try {
            const usersData = await api.get('/users');
            
            for (let i = 0; i < usersData.data.length; i++) {
                if (usersData.data[i].id === userContext.user.id) {
                    usersData.data.splice(i, 1);
                }
            }

            setUsers(usersData.data);
        } catch (error) {
            console.error(error);
            openErrorModal();
        }
    };

    useEffect(() => {
        getUsersToCall();
    });

    const sendCall = async callData => {
        try {
            await api.post('/calls', callData);

            hidePoupup();

            updateCalls();
        } catch (error) {
            console.error(error);
            openErrorModal();
        }
    };

    return (
        <div className="call-form-container">
            <h1>Realizar novo chamado</h1>
            <form action="/dashboard" method="POST" onSubmit={handleSubmit}>
                <select name="receiver" ref={receiverRef}>
                    <option value={''}>Selecione para quem enviar o chamado</option>
                    {
                        users.map(user => 
                            <option value={user.id}>{user.email}</option>
                        )
                    }
                </select>
                <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'receiver').length > 0 ? 'initial' : 'none'}}>Selecione o usu??rio para enviar o chamado</span>
                <input name="num_equip" type="text" placeholder="Insira o n??mero do equipamento" ref={numEquipRef} />
                <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'num_equip').length > 0 ? 'initial' : 'none'}}>O campo "N??mero do equipamento" n??o pode estar vazio</span>
                <span className="input-error" style={{display: isNaN(Number(numEquipRef.current.value)) ? 'initial' : 'none'}}>O campo "N??mero do equipamento" deve ser num??rico</span>
                <textarea name="description" type="text" placeholder="Insira a descri????o do problema" ref={descriptionRef}></textarea>
                <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'description').length > 0 ? 'initial' : 'none'}}>O campo "Descri????o" n??o pode estar vazio</span>
                <div className="form-buttons">
                    <button type="button" id="cancel" onClick={handleCancelForm}>Cancelar</button>
                    <button type="submit" id="confirm">Confirmar</button>                    
                </div>
            </form>
        </div>
    );
}