const mongoose = require('mongoose');

const { Schema } = mongoose;

const diaryModel = new Schema(
  {
    userID: { type: String },
    title: { type: String },
    content: { type: String },
    weather: {
      shortDescription: { type: String },
      temperature: { type: String },
      humidity: { type: String },
      pressure:{ type: String },
      visibility:{ type: String },
      windSpeed:{ type: String },
      windDeg:{ type: String },
      clouds:{ type: String },
      matchedLocatioName:{ type: String },
      },
    location: { type: String },
  }
);

module.exports = mongoose.model('Diary', diaryModel);
