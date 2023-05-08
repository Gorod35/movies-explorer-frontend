import './SearchForm.css';
import { useFormWithValidation } from '../../hooks/useFormWithValidation.js';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.jsx';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchForm({ onSearch, onShortMovie, isShortMovie }) {

  const { values, handleChange, isValid, resetForm } = useFormWithValidation();

  const [inputError, setInputError] = useState('');

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/movies') {
      if (localStorage.getItem('inputValues')) {
        const inputValues = localStorage.getItem('inputValues');
        resetForm({search: inputValues}, {}, true);
      }
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      setInputError('Нужно ввести ключевое слово')
    } else {
      setInputError('');
      onSearch(values);
    }
  }

  return (
    <section className="search">
      <form className="search__form" name="search" onSubmit={handleSubmit} noValidate>
        <div className="search__clue"></div>
        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          autoComplete="off"
          required
          onChange={handleChange}
          value={values.search || ''}
        />
        <span className="search__error">{inputError}</span>
        <button className="search__button" type="submit"></button>
        <div className='search__delimiter'></div>
      </form>
      <FilterCheckbox onShortMovie={onShortMovie} isShortMovie={isShortMovie} />
    </section>
  )
}