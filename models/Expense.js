const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  value: {
    type: Number,
    required: true,
  },
  expType: {
    type: Schema.Types.ObjectId,
    ref: 'expType',
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = Expense = mongoose.model('expType', ExpenseSchema);
