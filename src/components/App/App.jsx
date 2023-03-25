import './App.css';
import { React, useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import mainApi from '../../utils/MainApi.js';
import CurrentUserContext from '../../context/CurrentUserContext.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Main from '../Main/Main.jsx';
import Register from '../Register/Register.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import Login from '../Login/Login.jsx';
import Profile from '../Profile/Profile.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Movies from '../Movies/Movies.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import InfoTooltip from '../InfoTooltip/InfoTooltip.jsx';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';

function App() {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    successful: true,
    text: '',
  });
  const [isLoader, setIsLoader] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const [load, setLoad] = useState(false);

  //Получаем данные о пользователе, если у него есть токен
  useEffect(() => {
    const path = location.pathname;
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getUserInfo().then(data => {
        if (data) {
          setLoggedIn(true);
          setCurrentUser(data);
          history.push(path);
        }
      })
        .catch(err =>
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: err,
          })
        )
        .finally(() => {
          setIsLoader(false);
          setLoad(true);
        });
    } else {
      setLoad(true);
    }
  }, []);

  // получаем информацию о пользователе
  useEffect(() => {
    if (loggedIn) {
      setIsLoader(true);
      mainApi
        .getUserInfo()
        .then(res => setCurrentUser(res))
        .catch(err =>
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: err,
          })
        )
        .finally(() => setIsLoader(false));
    }
  }, [loggedIn]);

  function goBack() {
    history.goBack();
  }

  // закрываем попап с обратной связью
  function closeInfoTooltip() {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: false });
  }

  // открываем бургер-меню
  function onClickBurger() {
    setIsBurgerOpened(!isBurgerOpened);
  }


  // создаём пользователя по клику на регистрацию
  function handleRegister({ name, email, password }) {
    setIsLoader(true);
    mainApi.createUser(name, email, password)
      .then(data => {
        if (data._id) {
          handleLogin({ email, password });
        }
      })
      .catch(err =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
      .finally(() => setIsLoader(false));
  }

  // логиним пользователя и записываем его данные в токен
  function handleLogin({ email, password }) {
    setIsLoader(true);
    mainApi.login(email, password)
      .then(jwt => {
        if (jwt.token) {
          localStorage.setItem('jwt', jwt.token);
          setLoggedIn(true);
          history.push('/movies');
          setIsInfoTooltip({
            isOpen: true,
            successful: true,
            text: 'Добро пожаловать!',
          });
        }
      })
      .catch(err =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
      .finally(() => setIsLoader(false));
  }

  // очищаем данные пользователя при выходе
  function handleSignOut() {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.clear();
    history.push('/');
  }

  // обновляем данные пользователя
  function handleProfile({ name, email }) {
    setIsLoader(true);
    mainApi.updateUser(name, email).then(newUserData => {
      setCurrentUser(newUserData);
      setIsInfoTooltip({
        isOpen: true,
        successful: true,
        text: 'Данные обновлены успешно!',
      });
    })
      .catch(err =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
      .finally(() => setIsLoader(false));

  }

  // сохраняем лайкнутый фильм в список
  function handleSaveMovie(movie) {
    mainApi.addNewMovie(movie)
      .then(newMovie => {
        setSavedMoviesList([newMovie, ...savedMoviesList]);
      })
      .catch(err =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      );
  }

  //удаляем лайкнутый фильм из списка
  function handleDeleteMovie(movie) {
    const savedMovie = savedMoviesList.find((item) => item.movieId === movie.id || item.movieId === movie.movieId
    );
    mainApi.deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMoviesList.filter(m => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMoviesList(newMoviesList);
      })
      .catch(err =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        })
      );
  }


  // получаем список сохранённых фильмов
  useEffect(() => {
    if (loggedIn && currentUser) {
      mainApi.getSavedMovies()
        .then(data => {
          const UserMoviesList = data.filter(m => m.owner === currentUser._id);
          setSavedMoviesList(UserMoviesList);
        })
        .catch(err =>
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: err,
          })
        );
    }
  }, [currentUser, loggedIn]);

  const headerEndpoints = ['/movies', '/saved-movies', '/profile', '/'];
  const footerEndpoints = ['/movies', '/saved-movies', '/'];

  return (
    <div className="app">
      {!load ? (
        <Preloader isOpen={isLoader} />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <Route exact path={headerEndpoints}>
            <Header
              loggedIn={loggedIn}
              onClickBurger={onClickBurger}
              isBurgerOpened={isBurgerOpened}
            />
          </Route>
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route exact path='/signup'>
              {!loggedIn ? (
                <Register handleRegister={handleRegister} />
              ) : (
                <Redirect to='/' />
              )}
            </Route>
            <Route exact path='/signin'>
              {!loggedIn ? (
                <Login handleLogin={handleLogin} />
              ) : (
                <Redirect to='/' />
              )}
            </Route>
            <ProtectedRoute
              path='/movies'
              component={Movies}
              loggedIn={loggedIn}
              setIsLoader={setIsLoader}
              setIsInfoTooltip={setIsInfoTooltip}
              savedMoviesList={savedMoviesList}
              onLikeClick={handleSaveMovie}
              onDeleteClick={handleDeleteMovie}
            />
            <ProtectedRoute
              path='/saved-movies'
              component={SavedMovies}
              loggedIn={loggedIn}
              savedMoviesList={savedMoviesList}
              onDeleteClick={handleDeleteMovie}
              setIsInfoTooltip={setIsInfoTooltip}
            />
            <ProtectedRoute
              path='/profile'
              component={Profile}
              loggedIn={loggedIn}
              handleProfile={handleProfile}
              handleSignOut={handleSignOut}
            />
            <Route path='*'>
              <NotFound goBack={goBack} />
            </Route>
          </Switch>
          <Route exact path={footerEndpoints}>
            <Footer />
          </Route>
          <Preloader isOpen={isLoader} />
          <InfoTooltip status={isInfoTooltip} onClose={closeInfoTooltip} />
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;