import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components/macro';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { registerUser } from '../../actions/auth';

const mapStateToProps = state => ({
  errors: state.errors,
});

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Register = ({ registerUser, errors, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    registerUser(
      {
        name,
        email,
        password,
        password2,
      },
      history
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        required
        error={errors.name ? true : false}
        helperText={errors.name}
        type="text"
        name="name"
        label="Name"
        margin="normal"
        variant="outlined"
        onChange={e => setName(e.target.value)}
      />
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
      <TextField
        required
        error={errors.password2 ? true : false}
        helperText={errors.password2}
        type="password"
        name="confirmPassword"
        label="Confirm password"
        margin="normal"
        variant="outlined"
        onChange={e => setPassword2(e.target.value)}
      />
      <Button
        css={`
          && {
            background: ${props => props.theme.primaryColor};
            color: ${props => props.theme.primaryTextColor};
          }
        `}
        type="Submit"
      >
        Register
      </Button>
    </Form>
  );
};

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
