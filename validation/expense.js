const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExpenseInput(data) {
  let errors = {};
  let { amount, expTypeId, date } = data;

  amount = !isEmpty(amount) ? amount : '';
  expTypeId = !isEmpty(expTypeId) ? expTypeId : '';
  date = !isEmpty(date) ? date : '';

  if (Validator.isEmpty(amount.toString())) {
    errors.amount = 'amount is required';
  }
  if (amount < 1) {
    errors.amount = "amount can't be a negative number";
  }
  if (Validator.isEmpty(expTypeId)) {
    errors.expTypeId = 'Type is required';
  }
  if (Validator.isEmpty(date)) {
    errors.date = 'Expense must have a date';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
