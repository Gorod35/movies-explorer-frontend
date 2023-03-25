import './MoviesCard.css';

import { useLocation } from 'react-router-dom';
import { transformDuration } from '../../utils/utils.js';

export default function MoviesCard({ movie, saved, onLikeClick, onDeleteClick }) {
    const location = useLocation();

    // сохранение фильма
    function handleLikeClick() {
        onLikeClick(movie);
    }

    // удаление фильма
    function handleDeleteClick() {
        onDeleteClick(movie);
    }

    return (
        <li className="movies-card">
            <article className="movies-card__item">
                {location.pathname === '/movies' && (
                    <button
                        type="button"
                        className={`movies-card__button movies-card__button_type_${saved ? 'saved' : 'save'}`}
                        onClick={saved ? handleDeleteClick : handleLikeClick}
                        title={`${saved ? 'Удалить фильм из сохранённых' : 'Сохранить фильм'}`}
                    >{`${saved ? '' : 'Сохранить'}`}</button>
                )}
                {location.pathname === '/saved-movies' && (
                    <button
                        type="button"
                        className="movies-card__button movies-card__button_type_delete"
                        onClick={handleDeleteClick}
                        title="Удалить фильм из сохранённых"
                    ></button>
                )}
                <a className='movies-card__link' target="_blank" rel="noreferrer" href={movie.trailerLink}>
                    <img src={movie.image} alt='Фильм' className="movies-card__poster"
                    />
                </a>
                <div className="movies-card__description">
                    <h2 className="movies-card__title">{movie.nameRU}</h2>
                    <span className="movies-card__duration">{transformDuration(movie.duration)}</span>
                </div>
            </article>
        </li>
    );
}