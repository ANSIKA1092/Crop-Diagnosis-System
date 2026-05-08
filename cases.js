const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Case = require('../models/Case');

// Setup image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// POST /api/cases
router.post('/', upload.single('image'), async (req, res) => {
  const { cropType, symptoms, location, submittedBy } = req.body;
  const imagePath = req.file ? req.file.path : '';

  const newCase = await Case.create({
    caseId: 'CASE' + Date.now(),
    cropType,
    symptoms,
    imagePath,
    location,
    submittedBy,
    submittedAt: new Date(),
    status: 'pending',
    diagnosis: ''
  });

  res.json({ message: 'Case submitted', case: newCase });
});

// ✅ NEW: GET /api/cases
router.get('/', async (req, res) => {
  const cases = await Case.find().sort({ submittedAt: -1 });
  res.json(cases);
});

module.exports = router;