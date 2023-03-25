import './FilterCheckbox.css';

export default function FilterCheckbox({ shortMovies, handleShortFilms }) {
  return (
    <div className='filter'>
      <label className="filter__switch">
        <input
          className="filter__checkbox"
          type="checkbox"
        />
        <span className="filter__tumbler"></span>
      </label>
      <span className="filter__text">Короткометражки</span>
    </div>
  );
}