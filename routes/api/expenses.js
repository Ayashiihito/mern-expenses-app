const express = require('express');
const router = express.Router();

const Expense = require('../../models/Expense');

router.get('/', (req, res) => {
  Expense.find().then(expenses => res.json(expenses));
});

router.post('/', (req, res) => {
  const expense = new Expense({
    value: req.body.value,
    expType: req.body.expType,
  });
  expense.save().then(expense => res.json(expense));
});
module.exports = router;
