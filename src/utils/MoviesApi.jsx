class MoviesApi {
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
    getMovies() {
        return fetch(`${this._baseUrl}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => this._getResponseData(res));
    }
}

const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi;