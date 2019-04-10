import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../actions/auth';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors,
});

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
    <form onSubmit={handleSubmit}>
      <input
        required
        placeholder="email"
        type="email"
        name="email"
        onChange={e => setEmail(e.target.value)}
      />
      {errors.email ? <h2>{errors.email}</h2> : null}
      <input
        required
        placeholder="password"
        type="password"
        name="password"
        onChange={e => setPassword(e.target.value)}
      />
      {errors.password ? <h2>{errors.password}</h2> : null}
      <button type="Submit">Log in</button>
    </form>
  );
};

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
