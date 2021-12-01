import React, { useRef, useState } from "react";

import { Link } from 'react-router-dom';

import './style.css';
import userAvatar from '../../assets/user-avatar.svg';

import FormValidate from "../../services/FormValidate";

export default function PersonalizatePage() {
    const nameInputRef = useRef('');
    const phoneInputRef = useRef('');
    const departmentInputRef = useRef('');
    const passwordInputRef = useRef('');
    const confirmPasswordInputRef = useRef('');

    const [userImage, setUserImage] = useState(userAvatar);
    const [inputErrors, setInputErrors] = useState([]);

    const validator = new FormValidate([]);

    const handleSubmit = e => {
        e.preventDefault();

        const formData = [
            { name: nameInputRef.current.name, value: nameInputRef.current.value },
            { name: phoneInputRef.current.name, value: phoneInputRef.current.value },
            { name: departmentInputRef.current.name, value: departmentInputRef.current.value },
            { name: passwordInputRef.current.name, value: passwordInputRef.current.value },
            { name: confirmPasswordInputRef.current.name, value: confirmPasswordInputRef.current.value },
        ];

        validator.data = formData;

        validator.hasNullableValue();

        setInputErrors(validator.errors);
    };

    const handleUserPhoto = e => {
        let image = URL.createObjectURL(e.target.files[0]);
        setUserImage(image);
    }

    return (
        <div className="personalizate-major-container">
            <div className="personalizate-container">
                <form action="/" method="POST" onSubmit={handleSubmit}>
                    <div className="personalizate-user-avatar">
                        <img src={userImage} />
                        <label htmlFor="user-photo">Editar foto</label>
                        <input type="file" name="user-photo" id="user-photo" multiple accept=".jpg, .png, .svg" onChange={handleUserPhoto} />
                    </div>
                    <input name="name" type="text" placeholder="Insira seu nome" ref={nameInputRef} />
                    <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'name').length > 0 ? 'initial' : 'none'}}>O campo "Nome" não pode estar vazio</span>
                    <input name="phone" type="tel" placeholder="Insira seu Número de telefone" ref={phoneInputRef} />
                    <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'phone').length > 0 ? 'initial' : 'none'}}>O campo "Telefone" não pode estar vazio</span>
                    <input name="department" type="text" placeholder="Insira seu departamento" ref={departmentInputRef} />
                    <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'department').length > 0 ? 'initial' : 'none'}}>O campo "Departamento" não pode estar vazio</span>
                    <input name="password" type="password" placeholder="Insira sua senha" ref={passwordInputRef} />
                    <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'password').length > 0 ? 'initial' : 'none'}}>O campo "Senha" não pode estar vazio</span>
                    <input name="confirmPassword" type="password" placeholder="Confirme sua senha" ref={confirmPasswordInputRef} />
                    <span className="input-error" style={{display: passwordInputRef.current.value !== confirmPasswordInputRef.current.value ? 'initial' : 'none'}}>A senha não bate com a inicial</span>
                    <div className="form-buttons">
                        <Link to="/dashboard">
                            <button id="cancel">Cancelar</button>
                        </Link>
                        <button type="submit" id="confirm">Confirmar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}