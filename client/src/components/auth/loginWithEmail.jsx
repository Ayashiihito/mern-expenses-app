import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '../common/button';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { loginUser } from '../../redux/actions/auth';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors,
});

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
  flex-direction: column;
`;

const LoginWithEmail = ({ loginUser, errors, history, isAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    loginUser({
      email,
      password,
    });
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
      </Form>
      <RegisterContainer>
        New here? <Link to="/register">Create an account</Link>
      </RegisterContainer>
    </Paper>
  );
};

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(LoginWithEmail));
