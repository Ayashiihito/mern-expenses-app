const express = require('express');
const router = express.Router();

const Expense = require('../../models/Expense');

// get a list of all expenses
// PUBLIC
router.get('/', (req, res) => {
  Expense.find().then(expenses => res.json(expenses));
});

// put an expense in DB
//PUBLIC
router.post('/', (req, res) => {
  const expense = new Expense({
    value: req.body.value,
    expType: req.body.expType,
  });
  expense.save().then(expense => res.json(expense));
});

//delete an expense from DB
//PUBLIC
router.delete('/:id', (req, res) => {
  Expense.findById(req.params.id)
    .then(expense => expense.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});
module.exports = router;
