import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '../common/button';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components/macro';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';

import { loginWithFirebase } from '../../redux/actions/auth';
import Googlebtn from './googleBtn';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors,
});
const RegisterContainer = styled.span`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 5rem;
  flex-direction: column;
`;

// Configure Firebase for Google auth
firebase.initializeApp({
  apiKey: 'AIzaSyDXwOB2EN6FrFd6KT52vuvKUb4Dtm-fGgE',
  authDomain: 'expenses-app-id.firebaseapp.com',
  databaseURL: 'https://expenses-app-id.firebaseio.com',
  projectId: 'expenses-app-id',
  storageBucket: 'expenses-app-id.appspot.com',
  messagingSenderId: '801441428594',
});

const Login = ({ loginWithFirebase, history, isAuthenticated }) => {
  const onFirebaseLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    const { user } = await firebase.auth().signInWithPopup(provider);
    const jwt = user.h.b;
    loginWithFirebase(jwt);
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  });
  return (
    <Paper
      css={`
        display: flex;
        flex-direction: column;
        min-height: 95vh;
        justify-content: space-around;
        align-items: center;
        margin: 10px;
      `}
    >
      <Button
        css={`
          && {
            background: white;
            color: black;
            width: 15rem;
            height: 4rem;
            border-radius: 5px;
            box-shadow: ${props => props.theme.shadow};
          }
        `}
        onClick={onFirebaseLogin}
      >
        <Googlebtn />
        Login with Google
      </Button>
      <RegisterContainer>
        Also you can:
        <Link to="/register">Create an account</Link>
        or
        <Link to="/loginWithEmail">Login with Email</Link>
      </RegisterContainer>
    </Paper>
  );
};

export default connect(
  mapStateToProps,
  { loginWithFirebase }
)(withRouter(Login));
