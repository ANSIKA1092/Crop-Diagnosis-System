const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const kbRoutes = require('./routes/kb');
const caseRoutes = require('./routes/cases');
app.use('/api/kb', kbRoutes);
app.use('/api/cases', caseRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));