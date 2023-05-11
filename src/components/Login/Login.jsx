import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import React from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation.js';

export default function Login({ onLogin }) {

    const { values, handleChange, errors, isValid } = useFormWithValidation();

    const handleLogin = (e) => {
        e.preventDefault();
        onLogin(values);
    }

    return (
        <main className="login">
            <form onSubmit={handleLogin} className="login__form" name="login" >
                <div className="login__form-container">
                    <Link to="/">
                        <img src={logo} alt="Логотип" className="login__logo" />
                    </Link>
                    <h1 className="login__title">Рады видеть!</h1>
                    <div className="login__labels-container">
                        <label className="login__label">
                            <span className="login__label-text">E-mail</span>
                            <input
                                name="email"
                                className={`login__input login__input_type_email ${errors.email ? 'login__input_error' : ''}`}
                                type="email"
                                required
                                onChange={handleChange}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                value={values.email || ''}
                            />
                            <span className={`login__error ${errors.email ? '' : 'login__error_hidden'}`}>{errors.email}</span>
                        </label>
                        <label className="login__label">
                            <span className="login__label-text">Пароль</span>
                            <input
                                name="password"
                                className={`login__input ${errors.password ? 'login__input_error' : ''}`}
                                type="password"
                                minLength='8'
                                required
                                onChange={handleChange}
                                value={values.password || ''}
                            />
                            <span className={`login__error ${errors.password ? '' : 'login__error_hidden'}`}>{errors.password}</span>
                        </label>
                    </div>
                </div>
                <div className="login__button-container">
                    <button type="submit" className={`login__button ${isValid ? '' : 'login__button_disabled'}`}>Войти</button>
                    <span className="login__support">
                        Ещё не зарегистрированы?&nbsp;
                        <Link to="/signup" className="login__link">
                            Регистрация
                        </Link>
                    </span>
                </div>
            </form>
        </main>
    )
}