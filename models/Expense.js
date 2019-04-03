const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  value: {
    type: Number,
    required: true,
  },
  expType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Expense = mongoose.model('expense', ExpenseSchema);
