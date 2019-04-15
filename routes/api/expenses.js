const express = require('express');
const expenses = express.Router();
const passport = require('passport');

const Expense = require('../../models/Expense');
const ExpType = require('../../models/ExpType');

const validateExpenseInput = require('../../validation/expense.js');

//Make all api/expenses routes private
expenses.use(passport.authenticate('jwt', { session: false }));

//@route GET api/expenses
//@desc get a list of all expenses
expenses.get('/', (req, res) => {
  Expense.find({ user: req.user.id })
    .then(expenses => {
      res.json(expenses);
    })
    .catch(err => res.status(404));
});

//@route POST api/expenses
//@desc put an expense in DB
expenses.post('/', (req, res) => {
  const { errors, isValid } = validateExpenseInput(req.body);
  const { amount, expTypeId, date } = req.body;
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const expense = new Expense({
    user: req.user.id,
    amount,
    expTypeId,
    date,
  });

  ExpType.findById(expTypeId)
    .then(type =>
      expense.save().then(expense => {
        res.json(expense);
      })
    )
    .catch(err => {
      errors.expense = "ExpType wasn't found";
      console.log(err);
      return res.status(400).json(errors);
    });
});

//@route DELETE api/expenses/:id
//@desc delete an expense from DB
expenses.delete('/:id', (req, res) => {
  Expense.findById(req.params.id)
    .then(expense => {
      if (expense.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: 'User not authorized' });
      }
      expense.remove().then(() => res.json({ id: req.params.id }));
    })
    .catch(err =>
      res.status(404).json({ expensenotfound: 'No expense found' })
    );
});

module.exports = expenses;
