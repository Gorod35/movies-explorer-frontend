import './Movies.css';
import { useState, useContext, useEffect } from 'react';
import {
    transformMovies,
    filterMovies,
    filterShortMovies,
} from '../../utils/utils.js';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import moviesApi from '../../utils/MoviesApi.js';
import CurrentUserContext from '../../context/CurrentUserContext.jsx';

export default function Movies({ setIsLoader, setIsInfoTooltip, savedMoviesList, onLikeClick, onDeleteClick }) {

    const currentUser = useContext(CurrentUserContext);

    const [shortMovies, setShortMovies] = useState(false); // установка чекбокса
    const [initialMovies, setInitialMovies] = useState([]); // фильмы от api
    const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные фильмы
    const [NotFound, setNotFound] = useState(false); // ничего не найдено
    const [isAllMovies, setIsAllMovies] = useState([]); // все фильмы от сервера

    function handleSetFilteredMovies(movies, userQuery, shortMoviesCheckbox) {
        const moviesList = filterMovies(movies, userQuery, shortMoviesCheckbox);
        if (moviesList.length === 0) {
            setIsInfoTooltip({
                isOpen: true,
                successful: false,
                text: 'Ничего не найдено.',
            });
            setNotFound(true);
        } else {
            setNotFound(false);
        }
        setInitialMovies(moviesList);
        setFilteredMovies(
            shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
        );
        localStorage.setItem(
            `${currentUser.email} - movies`,
            JSON.stringify(moviesList)
        );
    }

    function handleSearchSubmit(inputValue) {
        localStorage.setItem(`${currentUser.email} - movieSearch`, inputValue);
        localStorage.setItem(`${currentUser.email} - shortMovies`, shortMovies);

        if (isAllMovies.length === 0) {
            setIsLoader(true);
            moviesApi.getMovies().then(movies => {
                setIsAllMovies(movies);
                handleSetFilteredMovies(transformMovies(movies), inputValue, shortMovies);
            })
                .catch(() =>
                    setIsInfoTooltip({
                        isOpen: true,
                        successful: false,
                        text: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
                    })
                )
                .finally(() => setIsLoader(false));
        } else {
            handleSetFilteredMovies(isAllMovies, inputValue, shortMovies);
        }
    }

    function handleShortFilms() {
        setShortMovies(!shortMovies);
        if (!shortMovies) {
            setFilteredMovies(filterShortMovies(initialMovies));
        } else {
            setFilteredMovies(initialMovies);
        }
        localStorage.setItem(`${currentUser.email} - shortMovies`, !shortMovies);
    }

    useEffect(() => {
        if (localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true') {
            setShortMovies(true);
        } else {
            setShortMovies(false);
        }
    }, [currentUser]);

    useEffect(() => {
        if (localStorage.getItem(`${currentUser.email} - movies`)) {
            const movies = JSON.parse(
                localStorage.getItem(`${currentUser.email} - movies`)
            );
            setInitialMovies(movies);
            if (
                localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true'
            ) {
                setFilteredMovies(filterShortMovies(movies));
            } else {
                setFilteredMovies(movies);
            }
        }
    }, [currentUser]);

    return (
        <main className="movies">
            <SearchForm handleSearchSubmit={handleSearchSubmit} handleShortFilms={handleShortFilms} shortMovies={shortMovies} />
            {!NotFound && (
                <MoviesCardList
                    moviesList={filteredMovies}
                    savedMoviesList={savedMoviesList}
                    onLikeClick={onLikeClick}
                    onDeleteClick={onDeleteClick}
                />
            )}
        </main>
    );
}