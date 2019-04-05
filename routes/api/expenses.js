const express = require('express');
const router = express.Router();

const Expense = require('../../models/Expense');

//@route GET api/expenses
//@desc get a list of all expenses
//@access PUBLIC
router.get('/', (req, res) => {
  Expense.find().then(expenses => res.json(expenses));
});

//@route POST api/expenses
//@desc put an expense in DB
//@access PUBLIC
router.post('/', (req, res) => {
  const expense = new Expense({
    value: req.body.value,
    expType: req.body.expType,
  });
  expense.save().then(expense => res.json(expense));
});

//@route DELETE api/expenses/:id
//@desc delete an expense from DB
//@access PUBLIC
router.delete('/:id', (req, res) => {
  Expense.findById(req.params.id)
    .then(expense => expense.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
