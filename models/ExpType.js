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

// Make a virtual 'id' field because '_id' leads to inconsistent code
ExpTypeSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized.
ExpTypeSchema.set('toJSON', {
  virtuals: true,
});

module.exports = ExpType = mongoose.model('expType', ExpTypeSchema);
