import React, { useContext, useRef, useState, useEffect } from "react";

import './style.css';

import {withRouter} from 'react-router-dom';

import FormValidate from "../../../services/FormValidate";

import UserContext from '../../../Context/userContext';

import api from '../../../services/api';

import { login } from '../../../services/auth';

export default withRouter(function LoginForm(props) {
    const emailInputRef = useRef('');
    const passwordInputRef = useRef('');

    const userContext = useContext(UserContext);

    const [inputErrors, setInputErrors] = useState([]);
    const [invalidPass, setInvalidPass] = useState(false);

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

        const userData = {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value
        };

        if (inputErrors.length === 0) handleLogin(userData);
    };

    const handleLogin = async userData => {
        try {
            const loginInfo = await api.post('/users/authenticate', userData);
            login(loginInfo.data.token);
            const resUser = await api.get(`/users/${loginInfo.data.user.id}`);
            userContext.insertUser(resUser.data);
            props.history.push('/dashboard');
        } catch (error) {
            console.error(error);
            if (error.response.status === 400) {
                setInvalidPass(true);
            }
        }
    };

    return (
        <div className="container-login-form">
            <h1>Login</h1>
            <form action="/dashboard" method="POST" onSubmit={handleSubmit}> 
                <input name="email" type="email" placeholder="Insira seu e-mail" ref={emailInputRef} />
                <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'email').length > 0 ? 'initial' : 'none'}}>O campo "Email" n??o pode estar vazio</span>
                <input name="password" type="password" placeholder="Insira sua senha" ref={passwordInputRef} />
                <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'password').length > 0 ? 'initial' : 'none'}}>O campo "Senha" n??o pode estar vazio</span>
                <span className="input-error" style={{display: invalidPass ? 'initial' : 'none'}}>Senha inv??lida</span>
                <button type="submit">Confirmar</button>
            </form>
        </div>
    );
});