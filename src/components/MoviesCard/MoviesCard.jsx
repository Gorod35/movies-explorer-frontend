import './MoviesCard.css';
import movieImage from '../../images/movie-image.jpg';
import { useState } from 'react';

export default function MoviesCard() {

    const [style, setStyle] = useState('movies-card__button');

    function changeStyle() {
        setStyle(`movies-card__button movies-card__button_type_saved`);
    }

    return (
        <li className="movies-card">
            <article className="movies-card__item">
                <button className={style} onClick={changeStyle}>Сохранить</button>
                <a className='movies-card__link' target="_blank" rel="noreferrer" href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
                    <img src={movieImage} alt='Фильм' title={`Описание: 33 слова о дизайне`} className="movies-card__poster"
                    />
                </a>
                <div className="movies-card__description">
                    <h2 className="movies-card__title">33 слова о дизайне</h2>
                    <span className="movies-card__duration">1ч 17м</span>
                </div>
            </article>
        </li>
    );
}