import React, { lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';

import configureStore from './redux/store';
import theme from './theme';
import PrivateRoute from './components/common/privateRoute';
import Navbar from './components/navbar';
import Suspended from './components/common/suspended';
import { logoutUser } from './redux/actions/auth';
import setUserWithToken from './util/setUserWithToken';

const Landing = lazy(() => import('./components/landing'));
const Login = lazy(() => import('./components/auth/login'));
const Register = lazy(() => import('./components/auth/register'));
const LoginWithEmail = lazy(() => import('./components/auth/loginWithEmail'));

const GlobalStyle = createGlobalStyle`

body {
  font-family: Roboto, sans-serif;
  background: #f9f9f9;
}`;

const store = configureStore();

if (localStorage.jwt) {
  // Login with token if its already stored in local storage
  const decoded = setUserWithToken(store.dispatch, localStorage.jwt);
  // Use the return value to logout user when token expires and redirect to login
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
        {/* 
        Switch is around private route to prevent weird bugs 
        (advice from internet, didn't test)
        */}
        <Switch>
          <PrivateRoute exact path="/" component={Suspended(Landing)} />
        </Switch>
        <Route exact path="/login" component={Suspended(Login)} />
        <Route exact path="/register" component={Suspended(Register)} />
        <Route
          exact
          path="/loginwithemail"
          component={Suspended(LoginWithEmail)}
        />
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;
