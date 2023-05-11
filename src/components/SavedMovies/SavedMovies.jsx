import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import { useEffect, useState } from 'react';

export default function SavedMovies({ savedMovies, onDeleteClick, onSearch, onShortMovie, isShortMovie, breakShortMovie }) {

    const [isNotFound, setIsNotFound] = useState(true);

    useEffect(() => {
        if (savedMovies.length === 0) {
            setIsNotFound(true);
        } else {
            setIsNotFound(false);
        }
    }, [savedMovies])

    useEffect(() => {
        breakShortMovie();
    },[])

    return (
        <main className="saved-movies">
            <SearchForm onSearch={onSearch} onShortMovie={onShortMovie} isShortMovie={isShortMovie} />
            {!isNotFound && (
                <MoviesCardList moviesList={savedMovies} onDeleteClick={onDeleteClick} />)}
        </main>
    );
}