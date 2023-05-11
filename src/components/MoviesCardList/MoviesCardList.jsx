import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import { getSavedMovies } from '../../utils/utils';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function MoviesCardList({ moviesList, savedMovies, onLikeClick, onDeleteClick }) {

    const [showMoviesList, setShowMoviesList] = useState([]);
    const [additionalNumbers, setAdditionalNumbers] = useState(0);

    const location = useLocation();

    function windowSize() {
        if (moviesList.length) {
            if (window.innerWidth >= 935) {
                setShowMoviesList(moviesList.filter((item, i) => i < 12));
                setAdditionalNumbers(3);
            }

            if (window.innerWidth >= 598 && window.innerWidth < 935) {
                setShowMoviesList(moviesList.filter((item, i) => i < 8));
                setAdditionalNumbers(2);
            }
            if (window.innerWidth < 598) {
                setShowMoviesList(moviesList.filter((item, i) => i < 5));
                setAdditionalNumbers(2);
            }
        }
    }


    useEffect(() => {
        if (location.pathname === '/movies') {
            windowSize();

            window.addEventListener('resize', resizeController);

            let resizeTimer;

            function resizeController() {
                if (!resizeTimer) {
                    resizeTimer = setTimeout(() => {
                        resizeTimer = null;
                        windowSize();
                    }, 1000);
                }
            };

        }

        if (location.pathname === '/saved-movies') {
            setShowMoviesList(moviesList);
        }
    }, [moviesList])

    function handleClickMoreMovies() {
        const start = showMoviesList.length;
        const end = start + additionalNumbers;
        const additional = moviesList.length - start;

        if (additional > 0) {
            const newCards = moviesList.slice(start, end);
            setShowMoviesList([...showMoviesList, ...newCards]);
        }
    }

    return (
        <section className="movies-card-list">
            <div className="movies-card-list__divider"></div>
            <ul className="movies-card-list__list">
                {showMoviesList.length && showMoviesList.map(movie => (
                    <MoviesCard key={movie.id || movie._id} movie={movie} saved={getSavedMovies(savedMovies, movie)} onLikeClick={onLikeClick} onDeleteClick={onDeleteClick} />
                ))}
            </ul>
            {(location.pathname === '/movies') && (showMoviesList.length < moviesList.length) && (
                <button onClick={handleClickMoreMovies} className="movies-card-list__show-more">Ещё</button>
            )}
        </section>
    );
}