import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import Hamburger from '../Hamburger/Hamburger.jsx';

export default function Navigation({ loggedIn, isBurgerOpened, onClickBurger }) {
  const activeLink = `navigation__link_active_${isBurgerOpened ? 'mobile' : 'desktop'}`;

  function handleClickOverlay(e) {
    e.stopPropagation();
  }

  return (
    <>
      {!loggedIn ? (
        <nav className="navigation">
          <ul className="navigation__list">
            <li>
              <Link to='/signup' className='navigation__link navigation__link_signup'>
                Регистрация
              </Link>
            </li>
            <li>
              <Link to='/signin' className='navigation__link navigation__link_landing navigation__link_signin'>
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className={`navigation navigation_state_${isBurgerOpened ? 'opened' : 'closed'}`} onClick={isBurgerOpened ? onClickBurger : undefined}>
          <Hamburger isBurgerOpened={isBurgerOpened} onClickBurger={onClickBurger} />
          <ul className={`navigation__list navigation__list_logged navigation__list_state_${isBurgerOpened ? 'opened' : 'closed'}`} onClick={handleClickOverlay}>
            {isBurgerOpened && (
              <li className="navigation__item">
                <NavLink exact to='/' className='navigation__link navigation__link-mobile' activeClassName={activeLink}>
                  Главная
                </NavLink>
              </li>
            )}
            <li className="navigation__item">
              <NavLink to='/movies' className='navigation__link navigation__link-mobile' activeClassName={activeLink}>
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink to='/saved-movies' className='navigation__link navigation__link-mobile' activeClassName={activeLink}>
                Сохранённые фильмы
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink to='/profile' className='navigation__link navigation__link_type_account navigation__link-mobile' activeClassName={activeLink}>
                Аккаунт
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}