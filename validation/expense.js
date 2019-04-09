const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExpenseInput(data) {
  let errors = {};
  let { amount, expTypeId, date } = data;

  expTypeId = !isEmpty(expTypeId) ? expTypeId : '';

  if (!date) {
    errors.date = 'Expense must have a date';
  }
  if (!amount) {
    errors.amount = 'amount is required';
  }
  if (amount < 1) {
    errors.amount = "amount can't be a negative number";
  }
  if (Validator.isEmpty(expTypeId)) {
    errors.expTypeId = 'Type is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
