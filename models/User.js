const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  RegistrationDate: {
    type: Date,
    default: Date.now,
  },
  googleId: String,
  avatar: String,
  avatarSmall: String,
});

module.exports = User = mongoose.model('user', UserSchema);
