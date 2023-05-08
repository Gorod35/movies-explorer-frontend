import './Profile.css';
import { useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation.js';

export default function Profile({ onUpdate, onLogOut }) {

    const currentUser = useContext(CurrentUserContext);
    const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

    const handleEditProfile = (e) => {
        e.preventDefault();
        onUpdate(values);
    }

    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser, {}, true);
        }
    }, [currentUser, resetForm]);

    const generalValid = (isValid && (values.name !== currentUser.name || values.email !== currentUser.email));

    return (
        <main className="profile">
            <form onSubmit={handleEditProfile} name='profile' className='profile__form'>
                <div className="profile__welcome-container">
                    <h1 className="profile__title">{`Привет, ${currentUser.name}`}</h1>
                    <ul className="profile__info-container">
                        <li className="profile__label">
                            <div className="profile__info">
                                <span className="profile__info-name">Имя</span>
                                <input
                                    className='profile__info-value'
                                    name="name"
                                    type="text"
                                    required
                                    minLength="2"
                                    maxLength="30"
                                    pattern='^[a-zA-Zа-яА-ЯёЁ\s-]+$'
                                    onChange={handleChange}
                                    value={values.name || ''} />
                            </div>
                            <span className={`profile__error ${errors.name ? '' : 'profile__error_hidden'}`}>{errors.name}</span>
                        </li>
                        <li className="profile__label">
                            <div className="profile__info">
                                <span className="profile__info-name">E-mail</span>
                                <input
                                    name="email"
                                    className='profile__info-value'
                                    type="email"
                                    required
                                    onChange={handleChange}
                                    value={values.email || ''} />
                            </div>
                            <span className={`profile__error ${errors.email ? '' : 'profile__error_hidden'}`}>{errors.email}</span>
                        </li>
                    </ul>
                </div>
                <div className="profile__buttons-container">
                    <button type='submit' disabled={!generalValid} className={`profile__button ${generalValid ? '' : 'profile__button_disabled'}`}>
                        Редактировать
                    </button>
                    <button onClick={onLogOut} className="profile__button profile__button-exit">
                        Выйти из аккаунта
                    </button>
                </div>
            </form>
        </main>
    )
}