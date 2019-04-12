import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components/macro';

import { loginUser } from '../../actions/auth';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors,
});

const MyPaper = styled(Paper)`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 2rem;
  transform: translate(-50%, -50%);
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
const Login = ({ loginUser, errors, history, isAuthenticated }) => {
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
    <MyPaper
      css={`
        padding: 3rem;
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
        <Button
          css={`
            && {
              background: ${props => props.theme.primaryColor};
              color: ${props => props.theme.primaryTextColor};
            }
          `}
          variant="contained"
          type="Submit"
        >
          Log in
        </Button>
      </Form>
    </MyPaper>
  );
};

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
