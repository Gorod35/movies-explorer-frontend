import './Profile.css';
import { Link } from 'react-router-dom';

export default function Profile() {

    return (
        <main className="profile">
            <div className="profile__container">
                <div className="profile__welcome-container">
                    <h1 className="profile__title">Привет, Виталий!</h1>
                    <ul className="profile__info-container">
                        <li className="profile__info">
                            <span className="profile__info-name">Имя</span>
                            <p className='profile__info-value'>Василий</p>
                        </li>
                        <li className="profile__info">
                            <span className="profile__info-name">E-mail</span>
                            <p className='profile__info-value'>pochta@yandex.ru</p>
                        </li>
                    </ul>
                </div>
                <div className="profile__buttons-container">
                    <Link to="edit" className="profile__link">
                        Редактировать
                    </Link>
                    <Link to="/" className="profile__link profile__link-exit">
                        Выйти из аккаунта
                    </Link>
                </div>
            </div>
        </main>
    )
}