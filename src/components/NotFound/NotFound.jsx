import './NotFound.css';

export default function NotFound() {
    return (
        <main className="not-found">
            <p className="not-found__text-container">
                <span className="not-found__error">404</span>
                <span className="not-found__error-name">Страница не найдена</span>
            </p>
            <button className="not-found__button">
                Назад
            </button>
        </main>
    );
}