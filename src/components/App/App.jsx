import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Main from '../Main/Main.jsx';
import Register from '../Register/Register.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import Login from '../Login/Login.jsx';
import Profile from '../Profile/Profile.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Movies from '../Movies/Movies.jsx';
import mainApi from '../../utils/MainApi.jsx';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.jsx';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import InfoTooltip from '../InfoToolTip/InfoToolTip.jsx';
import moviesApi from '../../utils/MoviesApi.jsx';
import { filterMovies } from '../../utils/utils';
import { filterShortMovies } from '../../utils/utils';

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(-1);
  }

  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState({
    header: false,
    main: false,
    footer: false
  });
  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    successful: true,
    text: '',
  });
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isShortSavedMovie, setIsShortSavedMovie] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);
  const [initialSavedMoviesList, setInitialSavedMoviesList] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  const [moviesList, setMoviesList] = useState([]);
  const [initialMoviesList, setInitialMoviesList] = useState([]);

  useEffect(() => {
    const path = location.pathname;
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsLoading(true);
      mainApi.getUserInfo()
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          navigate(path);
        })
        .catch((err) => {
          if (err === 'Ошибка: 401') {
            handleLogOut();
          } else {
            setIsInfoTooltip({
              isOpen: true,
              successful: false,
              text: err,
            });
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      mainApi.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: err,
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);



  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      mainApi.getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
        })
        .catch((err) => {
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: err,
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn])



  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setInitialMoviesList(movies);
      if (localStorage.getItem('isShortMovie') === 'true') {
        if (location.pathname === '/movies') {
          setIsShortMovie(true);
        }
        setMoviesList(filterShortMovies(movies));
      } else {
        setIsShortMovie(false);
        setMoviesList(movies);
      }
    }
  }, []);

  useEffect(() => {
    setFilteredSavedMovies(savedMovies);
    setInitialSavedMoviesList(savedMovies);
  }, [savedMovies])

  // проверка на авторизованность
  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case '/profile':
        setIsVisible({
          header: true,
          main: false,
          footer: false
        });
        break;
      case '/':
        setIsVisible({
          header: true,
          main: true,
          footer: true
        });
        break;
      case '/saved-movies':
        setIsVisible({
          header: true,
          main: false,
          footer: true
        });
        break;
      case '/movies':
        setIsVisible({
          header: true,
          main: false,
          footer: true
        });
        break;
      default:
        setIsVisible({
          header: false,
          main: false,
          footer: false
        })
    }
  }, [navigate]);

  function closeInfoTooltip() {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: false });
  }

  const handleLogin = (values) => {
    setIsLoading(true);
    mainApi.login(values)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          navigate('movies');
        }
      })
      .catch((err) => {
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        });
      })
      .finally(() => setIsLoading(false));
  }

  const handleRegister = ({ name, email, password }) => {
    setIsLoading(true);
    mainApi.createUser({ name, email, password })
      .then((res) => {
        if (res._id) {
          handleLogin({ email, password });
        }
      })
      .catch((err) => {
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        });
      })
      .finally(() => setIsLoading(false));
  }

  const handleUpdate = (values) => {
    setIsLoading(true);
    mainApi.updateUser(values.name, values.email)
      .then((res) => {
        setCurrentUser(res);
        setIsInfoTooltip({
          isOpen: true,
          successful: true,
          text: 'Данные успешно обновлены.',
        });
      })
      .catch((err) => {
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        });
      })
      .finally(() => setIsLoading(false));
  }

  function handleSearch(values) {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((res) => {
        localStorage.setItem('inputValues', values.search);
        if (filterMovies(res, values.search, isShortMovie).length) {
          setInitialMoviesList(filterMovies(res, values.search, false));
          setMoviesList(filterMovies(res, values.search, isShortMovie));
          localStorage.setItem('movies', JSON.stringify(filterMovies(res, values.search, isShortMovie)));
        } else {
          setMoviesList([]);
          setIsInfoTooltip({
            isOpen: true,
            successful: false,
            text: 'Ничего не найдено',
          });
        }

      })
      .catch((err) => {
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
        });
      })
      .finally(() => setIsLoading(false));
  }


  const handleLikeClick = (movie) => {
    mainApi.addNewMovie(movie)
      .then((res) => {
        setSavedMovies([res, ...savedMovies]);
      })
      .catch((err) => {
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        });
      })
  }

  const handleDeleteClick = (movie) => {
    const findMovie = savedMovies.find((item) => item.movieId === movie.id || item.movieId === movie.movieId);
    mainApi.deleteMovie(findMovie._id)
      .then((res) => {
        const newSavedMovies = savedMovies.filter((item) => item.movieId !== res.message.movieId);
        setSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err,
        });
      })
  }


  function handleLogOut() {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.clear();
    navigate('/');
  }

  function handleShortMovie() {
    setIsShortMovie(!isShortMovie);

    if (!isShortMovie) {
      setMoviesList(filterShortMovies(initialMoviesList));
    } else {
      setMoviesList(initialMoviesList);
    }

    localStorage.setItem('isShortMovie', !isShortMovie);
  }

  function handleShortSavedMovie() {
    setIsShortSavedMovie(!isShortSavedMovie);

    if (!isShortSavedMovie) {
      setFilteredSavedMovies(filterShortMovies(initialSavedMoviesList));
    } else {
      setFilteredSavedMovies(initialSavedMoviesList);
    }
  }

  function handleSavedMovieSearch(values) {
    if (filterMovies(savedMovies, values.search, isShortSavedMovie).length) {
      setInitialSavedMoviesList(filterMovies(savedMovies, values.search, false));
      setFilteredSavedMovies(filterMovies(savedMovies, values.search, isShortSavedMovie));
    } else {
      setFilteredSavedMovies([]);
      setIsInfoTooltip({
        isOpen: true,
        successful: false,
        text: 'Ничего не найдено',
      });
    }
  }

  function breakShortMovie() {
    setFilteredSavedMovies(savedMovies);
    setInitialSavedMoviesList(savedMovies);
    setIsShortSavedMovie(false);
  }

  function onClickBurger() {
    setIsBurgerOpened(!isBurgerOpened);
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path='/' element={<>
            <Header loggedIn={loggedIn} isVisible={isVisible.header} isBurgerOpened={isBurgerOpened} onClickBurger={onClickBurger} />
            {isVisible.main && <Main />}
            {isVisible.footer && <Footer />}
            {isLoading && <Preloader />}
            {isInfoTooltip.isOpen && <InfoTooltip onClose={closeInfoTooltip} status={isInfoTooltip} />}
          </>}>
            <Route path='signup' element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Register onRegister={handleRegister} />
              </ProtectedRoute>
            } />
            <Route path='signin' element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Login onLogin={handleLogin} />
              </ProtectedRoute>
            } />
            <Route path='movies' element={<>
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies moviesList={moviesList} onSearch={handleSearch} onShortMovie={handleShortMovie} isShortMovie={isShortMovie} savedMovies={savedMovies} onLikeClick={handleLikeClick} onDeleteClick={handleDeleteClick} />
              </ProtectedRoute>
            </>} />
            <Route path='profile' element={<>
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile onUpdate={handleUpdate} onLogOut={handleLogOut} />
              </ProtectedRoute>
            </>} />
            <Route path='saved-movies' element={<>
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies savedMovies={filteredSavedMovies} onDeleteClick={handleDeleteClick} onSearch={handleSavedMovieSearch} onShortMovie={handleShortSavedMovie} isShortMovie={isShortSavedMovie} breakShortMovie={breakShortMovie} />
              </ProtectedRoute>
            </>} />
          </Route>
          <Route path='*' element={<NotFound goBack={goBack} />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;