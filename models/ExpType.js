const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpTypeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

module.exports = ExpType = mongoose.model('expense', ExpTypeSchema);
