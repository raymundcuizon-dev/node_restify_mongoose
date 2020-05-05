const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true
  },
  password: {
    type: String,
    require: true,
    trim: true
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;