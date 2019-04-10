import React from 'react';
import { Provider } from 'react-redux';
import decode from 'jwt-decode';
import setAuthToken from './util/setAuthToken';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { setCurrentUser, logoutUser } from './actions/auth';

import configureStore from './Store';

import theme from './theme';
import PrivateRoute from './components/common/privateRoute';
import Navbar from './components/navbar';
import Landing from './components/landing';
import Login from './components/auth/login';
import Register from './components/auth/register';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto');

body {
  font-family: 'Roboto', sans-serif;
  background: #f9f9f9;
}`;

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

const App = () => (
  <Provider store={store}>
    <CssBaseline />
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/" component={Landing} />
        </Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;
