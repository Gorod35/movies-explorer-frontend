import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import { useEffect, useState } from 'react';

export default function Movies({ moviesList, onSearch, onShortMovie, isShortMovie, savedMovies, onLikeClick, onDeleteClick }) {


    const [isNotFound, setIsNotFound] = useState(true);

    useEffect(() => {
        if (moviesList.length === 0) {
            setIsNotFound(true);
        } else {
            setIsNotFound(false);
        }
    }, [moviesList])

    return (
        <main className="movies">
            <SearchForm onSearch={onSearch} onShortMovie={onShortMovie} isShortMovie={isShortMovie} />
            {!isNotFound && (
                <MoviesCardList moviesList={moviesList} savedMovies={savedMovies} onLikeClick={onLikeClick} onDeleteClick={onDeleteClick} />
            )}
        </main>
    );
}