import React, { useRef, useState, useContext, useEffect } from "react";

import './style.css';

import FormValidate from '../../services/FormValidate';
import UserContext from "../../Context/userContext";

import avatarImage from '../../assets/user-avatar.svg';

import api from '../../services/api'

export default function CallForm({ hidePoupup }) {
    const userContext = useContext(UserContext);

    const numEquipRef = useRef('');
    const descriptionRef = useRef('');
    const receiverRef = useRef('');

    const [inputErrors, setInputErrors] = useState([]);
    const [users, setUsers] = useState([]);

    const validator = new FormValidate([]);

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
        }
    };

    useEffect(() => {
        getUsersToCall();
    }, []);

    const sendCall = async callData => {
        try {
            await api.post('/calls', callData);
        } catch (error) {
            console.error(error);
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
                <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'receiver').length > 0 ? 'initial' : 'none'}}>Selecione o usuário para enviar o chamado</span>
                <input name="num_equip" type="text" placeholder="Insira o número do equipamento" ref={numEquipRef} />
                <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'num_equip').length > 0 ? 'initial' : 'none'}}>O campo "Número do equipamento" não pode estar vazio</span>
                <span className="input-error" style={{display: isNaN(Number(numEquipRef.current.value)) ? 'initial' : 'none'}}>O campo "Número do equipamento" deve ser numérico</span>
                <textarea name="description" type="text" placeholder="Insira a descrição do problema" ref={descriptionRef}></textarea>
                <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'description').length > 0 ? 'initial' : 'none'}}>O campo "Descrição" não pode estar vazio</span>
                <div className="form-buttons">
                    <button type="button" id="cancel" onClick={handleCancelForm}>Cancelar</button>
                    <button type="submit" id="confirm">Confirmar</button>                    
                </div>
            </form>
        </div>
    );
}