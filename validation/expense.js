const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExpenseInput(data) {
  let errors = {};
  let { value, expType, date } = data;

  expType = !isEmpty(expType) ? expType : '';

  if (!date) {
    errors.date = 'Expense must have a date';
  }
  if (!value) {
    errors.value = 'Value is required';
  }
  if (value < 1) {
    errors.value = "Value can't be a negative number";
  }
  if (Validator.isEmpty(expType)) {
    errors.expType = 'Type is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
