import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.jsx';

export default function SearchForm() {

  return (
    <section className="search">
      <form className="search__form" name="search" noValidate>
        <div className="search__clue"></div>
        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          autoComplete="off"
          required
        />
        <span className="search__error"></span>
        <button className="search__button" type="submit"></button>
        <div className='search__delimiter'></div>
      </form>
      <FilterCheckbox />
    </section>
  )
}