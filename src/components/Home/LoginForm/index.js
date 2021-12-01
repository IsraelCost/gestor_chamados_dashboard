import React, { useRef, useState } from "react";

import './style.css';

import FormValidate from "../../../services/FormValidate";

export default function LoginForm() {
    const emailInputRef = useRef('');
    const passwordInputRef = useRef('');

    const [inputErrors, setInputErrors] = useState([]);

    const validator = new FormValidate([]);

    const handleSubmit = e => {
        e.preventDefault();

        const formData = [
            { name: emailInputRef.current.name, value: emailInputRef.current.value },
            { name: passwordInputRef.current.name, value: passwordInputRef.current.value },
        ];

        validator.data = formData;

        validator.hasNullableValue();

        setInputErrors(validator.errors);
    };

    return (
        <div className="container-login-form">
            <h1>Login</h1>
            <form action="/dashboard" method="POST" onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Insira seu e-mail" ref={emailInputRef} />
                <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'email').length > 0 ? 'initial' : 'none'}}>O campo "Email" não pode estar vazio</span>
                <input name="password" type="password" placeholder="Insira sua senha" ref={passwordInputRef} />
                <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'password').length > 0 ? 'initial' : 'none'}}>O campo "Senha" não pode estar vazio</span>
                <button type="submit">Confirmar</button>
            </form>
        </div>
    );
}