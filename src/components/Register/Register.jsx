import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useEffect } from 'react';
import useFormWithValidation from '../../hooks/useFormWithValidation.jsx';

export default function Register({ handleRegister }) {
    const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(values);
    }

    useEffect(() => {
        resetForm();
      }, [resetForm]);

    return (
        <main className="register">
            <form className="register__form" name="register" noValidate onSubmit={handleSubmit}>
                <div className="register__form-container">
                    <Link to="/">
                        <img src={logo} alt="Логотип" className="register__logo" />
                    </Link>
                    <h1 className="register__title">Добро пожаловать!</h1>
                    <div className="register__labels-container">
                        <label className="register__label">
                            <span className="register__label-text">Имя</span>
                            <input
                                value={values.name || ''}
                                onChange={handleChange}
                                name="name"
                                className={`register__input ${errors.name && 'register__input_error'}`}
                                type="text"
                                required
                                minLength="2"
                                maxLength="30"
                                pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
                            />
                            <span className={`register__error ${!errors.name ? 'register__error_hidden' : ''}`}>{errors.name || ''}</span>
                        </label>
                        <label className="register__label">
                            <span className="register__label-text">E-mail</span>
                            <input
                                value={values.email || ''}
                                onChange={handleChange}
                                name="email"
                                className={`register__input register__input_type_email ${errors.email && 'register__input_error'}`}
                                type="email"
                                required
                            />
                            <span className={`register__error ${!errors.email ? 'register__error_hidden' : ''}`}>{errors.email || ''}</span>
                        </label>
                        <label className="register__label">
                            <span className="register__label-text">Пароль</span>
                            <input
                                value={values.password || ''}
                                onChange={handleChange}
                                name="password"
                                className={`register__input ${errors.password && 'register__input_error'}`}
                                type="password"
                                pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                                required
                            />
                            <span className={`register__error ${!errors.password ? 'register__error_hidden' : ''}`}>{errors.password || ''}</span>
                        </label>
                    </div>
                </div>
                <div className="register__button-container">
                    <button type="submit" className={`register__button ${!isValid && 'register__button_disabled'}`} disabled={!isValid}>Зарегистрироваться</button>
                    <span className="register__support">
                        Уже зарегистрированы?&nbsp;
                        <Link to="signin" className="register__link">
                            Войти
                        </Link>
                    </span>
                </div>
            </form>
        </main>
    )
}