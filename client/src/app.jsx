import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import decode from 'jwt-decode';
import setAuthToken from './util/setAuthToken';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';

import configureStore from './Store';
import theme from './theme';
import PrivateRoute from './components/common/privateRoute';
import Navbar from './components/navbar';
import { setCurrentUser, logoutUser } from './actions/auth';
import Suspended from './components/common/suspended';

const Landing = lazy(() => import('./components/landing'));
const Login = lazy(() => import('./components/auth/login'));
const Register = lazy(() => import('./components/auth/register'));

const GlobalStyle = createGlobalStyle`

body {
  font-family: Roboto, sans-serif;
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
          <PrivateRoute exact path="/" component={Suspended(Landing)} />
        </Switch>
        <Route exact path="/login" component={Suspended(Login)} />
        <Route exact path="/register" component={Suspended(Register)} />
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;
