import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';


export default function MoviesCardList() {

    return (
        <section className="movies-card-list">
            <div className="movies-card-list__divider"></div>
            <ul className="movies-card-list__list">
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </ul>
            <button className="movies-card-list__show-more">Ещё</button>
        </section>
    );
}