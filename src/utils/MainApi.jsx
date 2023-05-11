class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    createUser(values) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        }).then(res => this._getResponseData(res));
    }

    login(values) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        }).then(res => this._getResponseData(res));
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(res => this._getResponseData(res));
    }

    updateUser(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        }).then(res => this._getResponseData(res));
    }

    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(res => this._getResponseData(res));
    }

    addNewMovie(data) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: data.image,
                trailerLink: data.trailerLink,
                thumbnail: data.thumbnail,
                movieId: data.id,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
            }),
        }).then(res => this._getResponseData(res));
    }

    deleteMovie(data) {
        return fetch(`${this._baseUrl}/movies/${data}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(res => this._getResponseData(res));
    }
}

const mainApi = new Api({
    // создаём экземляр класса работающего с API сервера
    baseUrl: 'https://api.movies-explorer.gorod.nomoredomains.work',
});

export default mainApi;