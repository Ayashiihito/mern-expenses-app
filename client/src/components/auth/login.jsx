import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '../common/button';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components/macro';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

import { loginUser, loginWithFirebase } from '../../redux/actions/auth';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors,
});

const Wrapper = styled.div`
  margin: 2rem auto;
  max-width: 95vw;

  @media screen and (min-width: 480px) {
    max-width: 50vw;
  }
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
`;
const RegisterContainer = styled.span`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 5rem;
  border: solid #969696 1px;
  border-radius: 10px;
`;

const Login = ({
  loginUser,
  loginWithFirebase,
  errors,
  history,
  isAuthenticated,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    loginUser({
      email,
      password,
    });
  };
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
    <>
      <Wrapper>
        <Paper
          css={`
            padding: 1.5rem 0;
          `}
        >
          <Form onSubmit={handleSubmit}>
            <TextField
              required
              error={errors.email ? true : false}
              helperText={errors.email}
              type="email"
              name="email"
              label="Email"
              margin="normal"
              variant="outlined"
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              required
              error={errors.password ? true : false}
              helperText={errors.password}
              type="password"
              name="password"
              label="Password"
              margin="normal"
              variant="outlined"
              onChange={e => setPassword(e.target.value)}
            />
            <Button type="Submit">Log in</Button>
            <span
              css={`
                display: block;
                margin: 0.5rem;
              `}
            >
              OR
            </span>
            <Button
              css={`
                && {
                  background: #cc1818;
                  color: white;
                }
              `}
              onClick={onFirebaseLogin}
            >
              Login with Google
            </Button>
          </Form>
        </Paper>
        <RegisterContainer>
          New here?<Link to="/register">Create an account</Link>
        </RegisterContainer>
      </Wrapper>
    </>
  );
};

export default connect(
  mapStateToProps,
  { loginUser, loginWithFirebase }
)(withRouter(Login));
