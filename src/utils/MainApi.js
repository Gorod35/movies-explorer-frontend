// класс для взаимодействия с сервером
class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    // проверка статуса запроса
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    // регистрация
    createUser(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        }).then(res => this._getResponseData(res));
    }

    // вход
    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        }).then(res => this._getResponseData(res));
    }

    // запрос данных пользователя
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(res => this._getResponseData(res));
    }

    // запрос на редактирование данных пользователя
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

    // запрос фильмов
    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(res => this._getResponseData(res));
    }

    // сохранение фильма
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

    // удаление фильма из сохранённых
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