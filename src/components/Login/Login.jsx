import './Login.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useFormWithValidation from '../../hooks/useFormWithValidation.jsx';

export default function Login({ handleLogin }) {

    const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin(values);
    }

    useEffect(() => {
        resetForm();
    }, [resetForm]);

    return (
        <main className="login">
            <form className="login__form" name="login" noValidate onSubmit={handleSubmit}>
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
                                className={`login__input login__input_type_email ${errors.email && 'login__input_error'}`}
                                type="email"
                                onChange={handleChange}
                                value={values.email || ''}
                                required
                            />
                            <span className={`login__error ${!errors.email ? 'login__error_hidden' : ''}`}>{errors.email || ''}</span>
                        </label>
                        <label className="login__label">
                            <span className="login__label-text">Пароль</span>
                            <input
                                name="password"
                                className={`login__input ${errors.password && 'login__input_error'}`}
                                type="password"
                                onChange={handleChange}
                                value={values.password || ''}
                                minLength="8"
                                required
                            />
                            <span className={`login__error ${!errors.password ? 'login__error_hidden' : ''}`}>{errors.password || ''}</span>
                        </label>
                    </div>
                </div>
                <div className="login__button-container">
                    <button type="submit" className={`login__button ${!isValid && 'login__button_disabled'}`} disabled={!isValid}>Войти</button>
                    <span className="login__support">
                        Ещё не зарегистрированы?&nbsp;
                        <Link to="signup" className="login__link">
                            Регистрация
                        </Link>
                    </span>
                </div>
            </form>
        </main>
    )
}