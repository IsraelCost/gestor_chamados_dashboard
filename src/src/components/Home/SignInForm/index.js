import React, { useContext, useRef, useState } from "react";

import './style.css';

import FormValidate from "../../../services/FormValidate";

import api from '../../../services/api';

import UserContext from "../../../Context/userContext";
import { login } from "../../../services/auth";

import { withRouter } from 'react-router-dom';

export default withRouter(function SignInForm(props) {
    const nameInputRef = useRef('');
    const emailInputRef = useRef('');
    const phoneInputRef = useRef('');
    const departmentInputRef = useRef('');
    const passwordInputRef = useRef('');
    const confirmPasswordInputRef = useRef('');

    const userContext = useContext(UserContext);

    const [inputErrors, setInputErrors] = useState([]);
    const [userExists, setUserExists] = useState(false);

    const validator = new FormValidate([]);

    const handleSubmit = e => {
        e.preventDefault();

        const formData = [
            { name: nameInputRef.current.name, value: nameInputRef.current.value },
            { name: emailInputRef.current.name, value: emailInputRef.current.value },
            { name: phoneInputRef.current.name, value: phoneInputRef.current.value },
            { name: departmentInputRef.current.name, value: departmentInputRef.current.value },
            { name: passwordInputRef.current.name, value: passwordInputRef.current.value },
            { name: confirmPasswordInputRef.current.name, value: confirmPasswordInputRef.current.value },
        ];

        validator.data = formData;

        validator.hasNullableValue();

        setInputErrors(validator.errors);

        const userData = {
            dept: departmentInputRef.current.value,
            email: emailInputRef.current.value,
            tel: phoneInputRef.current.value,
            name: nameInputRef.current.value,
            password: passwordInputRef.current.value,
        };

        if (inputErrors.length === 0) handleSignIn(userData);
    };

    const handleSignIn = async userData => {
        try {
            await api.post('/users', userData);

            const loginData = await api.post('/users/authenticate', { 
                email: userData.email,
                password: userData.password
            });

            login(loginData.data.token, loginData.data.user.id);

            let resUser = await api.get(`/users/${loginData.data.user.id}`);
            await api.post(`/images`, { user_id: loginData.data.user.id });
            resUser = await api.get(`/users/${loginData.data.user.id}`);
            userContext.insertUser(resUser.data);

            props.history.push('/dashboard');
        } catch (error) {
            console.error(error);
            setUserExists(true);
        }
    };

    return (
        <div className="container-sign-in-form">
            <h1>Cadastre-se</h1>
            <form action="/dashboard" method="POST" onSubmit={handleSubmit}>
                <input name="name" type="text" placeholder="Insira seu nome" ref={nameInputRef} />
                <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'name').length > 0 ? 'initial' : 'none'}}>O campo "Nome" não pode estar vazio</span>
                <input name="email" type="email" placeholder="Insira seu Email" ref={emailInputRef} />
                <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'email').length > 0 ? 'initial' : 'none'}}>O campo "Email" não pode estar vazio</span>
                <span className="input-error" style={{display: userExists ? 'initial' : 'none'}}>Já existe um usuário com este email cadastrado no app</span>
                <input name="phone" type="tel" placeholder="Insira seu Número de telefone" ref={phoneInputRef} />
                <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'phone').length > 0 ? 'initial' : 'none'}}>O campo "Telefone" não pode estar vazio</span>
                <input name="department" type="text" placeholder="Insira seu departamento" ref={departmentInputRef} />
                <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'department').length > 0 ? 'initial' : 'none'}}>O campo "Departamento" não pode estar vazio</span>
                <input name="password" type="password" placeholder="Insira sua senha" ref={passwordInputRef} />
                <span className="input-error" style={{display: inputErrors.filter(el => el.fieldName === 'password').length > 0 ? 'initial' : 'none'}}>O campo "Senha" não pode estar vazio</span>
                <input name="confirmPassword" type="password" placeholder="Confirme sua senha" ref={confirmPasswordInputRef} />
                <span className="input-error" style={{display: passwordInputRef.current.value !== confirmPasswordInputRef.current.value ? 'initial' : 'none'}}>A senha não bate com a inicial</span>
                <button type="submit">Confirmar</button>
            </form>
        </div>
        
    );
});