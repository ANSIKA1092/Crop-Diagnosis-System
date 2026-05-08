const mongoose = require('mongoose');

const kbSchema = new mongoose.Schema({
  kbId: String,
  diseaseName: String,
  symptoms: String,
  remedies: String,
  images: [String],
  cropTypes: [String],
  createdBy: String,
  createdAt: Date
});

module.exports = mongoose.model('KnowledgeBase', kbSchema);