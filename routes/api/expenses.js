const express = require('express');
const router = express.Router();
const passport = require('passport');

const Expense = require('../../models/Expense');

const validateExpenseInput = require('../../validation/expense.js');

//@route GET api/expenses
//@desc get a list of all expenses
//@access PRIVATE
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Expense.find({ user: req.user.id })
      .then(expenses => res.json(expenses))
      .catch(err => res.status(404));
  }
);

//@route POST api/expenses
//@desc put an expense in DB
//@access PRIVATE
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExpenseInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const expense = new Expense({
      user: req.user.id,
      value: req.body.value,
      expType: req.body.expType,
      date: req.body.date,
    });
    expense.save().then(expense => res.json(expense));
  }
);

//@route DELETE api/expenses/:id
//@desc delete an expense from DB
//@access PRIVATE
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Expense.findById(req.params.id)
      .then(expense => {
        if (expense.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: 'User not authorized' });
        }
        expense.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ expensenotfound: 'No expense found' })
      );
  }
);

module.exports = router;
