const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExpTypeInput(data) {
  let errors = {};
  let { name, color } = data;

  name = !isEmpty(name) ? name : '';
  color = !isEmpty(color) ? color : '';

  if (Validator.isEmpty(name)) {
    errors.expType = 'Name is required';
  }
  if (Validator.isEmpty(color)) {
    errors.expType = 'Color is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
