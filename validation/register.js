const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  let { name, email, password, password2 } = data;

  name = !isEmpty(name) ? name : '';
  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';
  password2 = !isEmpty(password2) ? password2 : '';

  if (!Validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }
  if (Validator.isEmpty(name)) {
    errors.name = 'Name is required';
  }
  if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(email)) {
    errors.email = 'Email is required';
  }
  if (Validator.isEmpty(password)) {
    errors.password = 'Password is required';
  }
  if (!Validator.isLength(password, { min: 5, max: 30 })) {
    errors.password = 'Password must be between 5 and 30 characters';
  }
  if (Validator.isEmpty(password2)) {
    errors.password2 = 'Confirm password is required';
  }
  if (!Validator.equals(password, password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
