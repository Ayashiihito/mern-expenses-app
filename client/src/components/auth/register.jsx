import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/auth';

const mapStateToProps = state => ({
  errors: state.errors,
});

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
      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder="name"
          type="text"
          name="email"
          onChange={e => setName(e.target.value)}
        />
        {errors.name ? <h2>{errors.name}</h2> : null}
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
        <input
          required
          placeholder="confirm password"
          type="password"
          name="email"
          onChange={e => setPassword2(e.target.value)}
        />
        {errors.password2 ? <h2>{errors.password2}</h2> : null}
        <button type="Submit">Register</button>
      </form>
  );
};

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
