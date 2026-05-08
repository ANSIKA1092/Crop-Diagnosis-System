const mongoose = require('mongoose');
module.exports = mongoose.model('User', new mongoose.Schema({
  userId: String,
  name: String,
  role: String,
  email: String,
  passwordHash: String,
  phone: String,
  location: String
}));