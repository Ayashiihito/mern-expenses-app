import React, { lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import decode from 'jwt-decode';
import CssBaseline from '@material-ui/core/CssBaseline';
import firebase from 'firebase';
import 'typeface-roboto';

import configureStore from './Store';
import setAuthToken from './util/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/auth';
import theme from './theme';
import PrivateRoute from './components/common/privateRoute';
import Navbar from './components/navbar';
import Suspended from './components/common/suspended';

const Landing = lazy(() => import('./components/landing'));
const Login = lazy(() => import('./components/auth/login'));
const Register = lazy(() => import('./components/auth/register'));

const GlobalStyle = createGlobalStyle`

body {
  font-family: Roboto, sans-serif;
  background: #f9f9f9;
}`;

firebase.initializeApp({
  apiKey: 'AIzaSyDXwOB2EN6FrFd6KT52vuvKUb4Dtm-fGgE',
  authDomain: 'expenses-app-id.firebaseapp.com',
  databaseURL: 'https://expenses-app-id.firebaseio.com',
  projectId: 'expenses-app-id',
  storageBucket: 'expenses-app-id.appspot.com',
  messagingSenderId: '801441428594',
});

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
          <PrivateRoute exact path="/" component={Suspended(Landing)} />
        </Switch>
        <Route exact path="/login" component={Suspended(Login)} />
        <Route exact path="/register" component={Suspended(Register)} />
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;
