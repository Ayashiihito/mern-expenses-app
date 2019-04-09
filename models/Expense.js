const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  amount: {
    type: Number,
    required: true,
  },
  expTypeId: {
    type: Schema.Types.ObjectId,
    ref: 'expType',
  },
  date: {
    type: Date,
    required: true,
  },
});

// Duplicate the ID field.
ExpenseSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ExpenseSchema.set('toJSON', {
  virtuals: true,
});

module.exports = Expense = mongoose.model('expense', ExpenseSchema);
