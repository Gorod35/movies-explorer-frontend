import './FilterCheckbox.css';

export default function FilterCheckbox({ onShortMovie, isShortMovie }) {

  return (
    <div className='filter'>
      <label className="filter__switch">
        <input
          className="filter__checkbox"
          type="checkbox"
          onChange={onShortMovie}
          checked={isShortMovie}
        />
        <span className="filter__tumbler"></span>
      </label>
      <span className="filter__text">Короткометражки</span>
    </div>
  );
}