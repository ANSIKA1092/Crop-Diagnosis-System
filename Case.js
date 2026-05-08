const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  caseId: String,
  cropType: String,
  symptoms: String,
  imagePath: String,
  location: String,
  submittedBy: String,
  submittedAt: Date,
  status: String,
  diagnosis: String
});

module.exports = mongoose.model('Case', caseSchema);