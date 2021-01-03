const mongoose = require('mongoose');

const { Schema } = mongoose;

const diaryModel = new Schema(
  {
    userID: { type: String },
    title: { type: String },
    Content: { type: String },
    weather: { type: String },
  }
);

module.exports = mongoose.model('Diary', diaryModel);
