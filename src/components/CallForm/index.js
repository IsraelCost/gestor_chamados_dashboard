import React, { useRef, useState } from "react";

import './style.css';

import FormValidate from '../../services/FormValidate';

export default function CallForm({ hidePoupup }) {
    const numEquipRef = useRef('');
    const descriptionRef = useRef('');

    const [inputErrors, setInputErrors] = useState([]);

    const validator = new FormValidate([]);

    const handleSubmit = e => {
        e.preventDefault();

        const formData = [
            { name: numEquipRef.current.name, value: numEquipRef.current.value },
            { name: descriptionRef.current.name, value: descriptionRef.current.value },
        ];

        validator.data = formData;

        validator.hasNullableValue();

        setInputErrors(validator.errors);
    };

    const handleCancelForm = () => {
        hidePoupup();
    };

    return (
        <div className="call-form-container">
            <h1>Realizar novo chamado</h1>
            <form action="/dashboard" method="POST" onSubmit={handleSubmit}>
                <input name="num_equip" type="email" placeholder="Insira o número do equipamento" ref={numEquipRef} />
                <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'num_equip').length > 0 ? 'initial' : 'none'}}>O campo "Número do equipamento" não pode estar vazio</span>
                <textarea name="description" type="password" placeholder="Insira a descrição do problema" ref={descriptionRef}></textarea>
                <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'description').length > 0 ? 'initial' : 'none'}}>O campo "Descrição" não pode estar vazio</span>
                <div className="form-buttons">
                    <button type="button" id="cancel" onClick={handleCancelForm}>Cancelar</button>
                    <button type="submit" id="confirm">Confirmar</button>                    
                </div>
            </form>
        </div>
    );
}