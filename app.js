const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Models
const Case = require('./models/Case');
const Diagnosis = require('./models/Diagnosis');
const KnowledgeBase = require('./models/KnowledgeBase');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/cropDiagnosis', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Submit a new case
app.post('/api/cases', upload.array('images'), async (req, res) => {
  try {
    const { farmerId, cropType, description, location } = req.body;
    const imagePaths = req.files.map(file => file.path);
    const newCase = new Case({
      farmerId,
      cropType,
      description,
      location,
      images: imagePaths,
      status: 'Pending',
      createdAt: new Date()
    });
    await newCase.save();
    res.json({ success: true, caseId: newCase._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get cases by crop and status
app.get('/api/cases', async (req, res) => {
  try {
    const { crop, status } = req.query;
    const cases = await Case.find({ cropType: crop, status });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit a diagnosis
app.post('/api/diagnoses', async (req, res) => {
  try {
    const { caseId, expertId, diseaseLabel, confidence, remedyText } = req.body;
    const diagnosis = new Diagnosis({
      caseId,
      expertId,
      diseaseLabel,
      confidence,
      remedyText,
      createdAt: new Date()
    });
    await diagnosis.save();
    res.json({ success: true, diagnosisId: diagnosis._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Search knowledge base
app.get('/api/kb/search', async (req, res) => {
  try {
    const { q } = req.query;
    const results = await KnowledgeBase.find({
      symptoms: { $regex: q, $options: 'i' }
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});