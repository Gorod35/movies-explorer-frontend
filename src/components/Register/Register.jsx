import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useFormWithValidation } from '../../hooks/useFormWithValidation.js';

export default function Register( { onRegister } ) {

    const { values, handleChange, errors, isValid } = useFormWithValidation();

    const handleRegister = (e) => {
        e.preventDefault();
        onRegister(values);
    }

    return (
        <main className="register">
            <form onSubmit={handleRegister} className="register__form" name="register">
                <div className="register__form-container">
                    <Link to="/">
                        <img src={logo} alt="Логотип" className="register__logo" />
                    </Link>
                    <h1 className="register__title">Добро пожаловать!</h1>
                    <div className="register__labels-container">
                        <label className="register__label">
                            <span className="register__label-text">Имя</span>
                            <input
                                name="name"
                                className={`register__input ${errors.name ? 'register__input_error' : ''}`}
                                type="text"
                                required
                                minLength="2"
                                maxLength="30"
                                pattern='^[a-zA-Zа-яА-ЯёЁ\s-]+$'
                                value={values.name || ''} 
                                onChange={handleChange}
                            />
                            <span className={`register__error ${errors.name ? '' : 'register__error_hidden'}`}>{errors.name}</span>
                        </label>
                        <label className="register__label">
                            <span className="register__label-text">E-mail</span>
                            <input
                                name="email"
                                className={`register__input register__input_type_email ${errors.email ? 'register__input_error' : ''}`}
                                type="email"
                                required
                                value={values.email || ''} 
                                onChange={handleChange}
                            />
                            <span className={`register__error ${errors.email ? '' : 'register__error_hidden'}`}>{errors.email}</span>
                        </label>
                        <label className="register__label">
                            <span className="register__label-text">Пароль</span>
                            <input
                                name="password"
                                className={`register__input ${errors.password ? 'register__input_error' : ''}`}
                                type="password"
                                minLength='8'
                                required
                                value={values.password || ''} 
                                onChange={handleChange}
                            />
                            <span className={`register__error ${errors.password ? '' : 'register__error_hidden'}`}>{errors.password}</span>
                        </label>
                    </div>
                </div>
                <div className="register__button-container">
                    <button type="submit" className={`register__button ${isValid ? '' : 'register__button_disabled'}`}>Зарегистрироваться</button>
                    <span className="register__support">
                        Уже зарегистрированы?&nbsp;
                        <Link to="/signin" className="register__link">
                            Войти
                        </Link>
                    </span>
                </div>
            </form>
        </main>
    )
}