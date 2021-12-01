import React from 'react';

import LoginForm from '../components/Home/LoginForm';
import SignInForm from '../components/Home/SignInForm';

import './style.css';

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-spaced-container">
                <LoginForm />
                <div className="home-middle">
                    <div className="divisor"></div>
                    <span>OU</span>
                    <div className="divisor"></div>
                </div>
                <SignInForm />
            </div>
        </div>
    );
}