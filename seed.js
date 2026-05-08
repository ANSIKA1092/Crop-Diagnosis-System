const mongoose = require('mongoose');
const KnowledgeBase = require('./models/KnowledgeBase');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await KnowledgeBase.insertMany([
      {
        kbId: "KB002",
        diseaseName: "Bacterial Leaf Blight",
        symptoms: "water-soaked lesions, wilting, yellow streaks",
        remedies: "Use resistant varieties and avoid overhead irrigation",
        images: [],
        cropTypes: ["rice"],
        createdBy: "admin",
        createdAt: new Date()
      },
      {
        kbId: "KB003",
        diseaseName: "Powdery Mildew",
        symptoms: "white powdery spots, leaf curling",
        remedies: "Apply sulfur-based fungicide and improve air circulation",
        images: [],
        cropTypes: ["wheat", "barley"],
        createdBy: "admin",
        createdAt: new Date()
      },
      {
        kbId: "KB004",
        diseaseName: "Root Rot",
        symptoms: "brown roots, stunted growth, leaf drop",
        remedies: "Improve drainage and apply fungicide",
        images: [],
        cropTypes: ["soybean", "chickpea"],
        createdBy: "admin",
        createdAt: new Date()
      }
    ]);
    console.log("More KB entries inserted");
    mongoose.disconnect();
  })
  .catch(err => console.error(err));