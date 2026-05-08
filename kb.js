const express = require('express');
const router = express.Router();
const KB = require('../models/KnowledgeBase');

router.get('/search', async (req, res) => {
  const query = req.query.q;
  const results = await KB.find({ symptoms: { $regex: query, $options: 'i' } });
  res.json(results);
});

module.exports = router;