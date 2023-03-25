import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Login() {

    return (
        <main className="login">
            <form className="login__form" name="login" noValidate >
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
                                className='login__input login__input_type_email'
                                type="email"
                                required
                            />
                            <span className="login__error login__error_hidden"></span>
                        </label>
                        <label className="login__label">
                            <span className="login__label-text">Пароль</span>
                            <input
                                name="password"
                                className='login__input'
                                type="password"
                                required
                            />
                            <span className="login__error login__error_hidden"></span>
                        </label>
                    </div>
                </div>
                <div className="login__button-container">
                    <button type="submit" className='login__button'>Войти</button>
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