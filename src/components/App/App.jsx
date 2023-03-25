import './App.css';
import { React, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Main from '../Main/Main.jsx';
import Register from '../Register/Register.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import Login from '../Login/Login.jsx';
import Profile from '../Profile/Profile.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Movies from '../Movies/Movies.jsx';

function App() {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  function onClickBurger() {
    setIsBurgerOpened(!isBurgerOpened);
  }

  const headerEndpoints = ['/movies', '/saved-movies', '/profile', '/'];
  const footerEndpoints = ['/movies', '/saved-movies', '/'];

  return (
    <div className="app">
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
            <Register />
          ) : (
            <Redirect to='/' />
          )}
        </Route>
        <Route exact path='/signin'>
          {!loggedIn ? (
            <Login />
          ) : (
            <Redirect to='/' />
          )}
        </Route>
        <Route
          path='/movies'
          component={Movies}
          loggedIn={loggedIn}
        />
        <Route
              path='/saved-movies'
              component={SavedMovies}
              loggedIn={loggedIn}
            />
        <Route
          path='/profile'
          component={Profile}
        />
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
      <Route exact path={footerEndpoints}>
        <Footer />
      </Route>
    </div>
  );
}

export default App;