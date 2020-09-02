const express = require('express');
const expenses = express.Router();
const passport = require('passport');

const Expense = require('../../models/Expense');
const ExpType = require('../../models/ExpType');

const validateExpenseInput = require('../../validation/expense.js');

//Make all api/expenses routes PRIVATE
expenses.use(passport.authenticate('jwt', { session: false }));

//@route GET api/expenses
//@desc get a list of all expenses
//@access PRIVATE
expenses.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch {
    res.status(404);
  }
});

//@route POST api/expenses
//@desc put an expense in DB
//@access PRIVATE
expenses.post('/', async (req, res) => {
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

  const type = await ExpType.findById(expTypeId);

  if (type) {
    const savedExpense = await expense.save();
    res.json(savedExpense);
  } else {

    errors.expense = "ExpType wasn't found";
    return res.status(400).json(errors);
  }
});

//@route DELETE api/expenses/:id
//@desc delete an expense from DB
//@access PRIVATE
expenses.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ notauthorized: 'User not authorized' });
    }

    await expense.remove();
    res.json({ id: req.params.id });
  } catch {
    res.status(404).json({ notfound: 'No expense found' });
  }
});

module.exports = expenses;
