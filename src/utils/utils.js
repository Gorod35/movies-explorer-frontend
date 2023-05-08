function transformDuration(duration) {
    if (duration < 60) {
        return `${duration}м`
    }
    if (duration >= 60) {
        return `${~~(duration / 60)}ч ${duration % 60}м`
    }
}


function transformMovieImage(image) {
    if (image.url) {
        return `https://api.nomoreparties.co${image.url}`
    } else {
        return image;
    }
}

function transformMovie(movie) {
    movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
    movie.image = `https://api.nomoreparties.co${movie.image.url}`;
}

function getSavedMovies(arr, movie) {
    if (arr) {
        if (arr.length) {
            return arr.find((item) => {
                return item.movieId === (movie.id || movie.movieId);
            });
        }
    } else {
        return;
    }
}

function filterShortMovies(movies) {
    return movies.filter(movie => movie.duration < 40);
}

function filterMovies(movies, inputValues, isShortMovie) {
    const filteredMovies = movies.filter((movie) => {
        const movieRu = String(movie.nameRU).toLowerCase().trim();
        const movieEn = String(movie.nameEN).toLowerCase().trim();
        const userMovie = inputValues.toLowerCase().trim();

        return (movieRu.includes(userMovie) || movieEn.includes(userMovie));
    })

    if (isShortMovie) {
        return filterShortMovies(filteredMovies);
    } else {
        return filteredMovies;
    }
}


export {
    transformDuration,
    transformMovieImage,
    getSavedMovies,
    transformMovie,
    filterMovies,
    filterShortMovies
};
