const mongoose = require("mongoose");

const bhajanSchema = new mongoose.Schema({
  houseName: String,
  date: String,
  nameHindi: String,
  nameHinglish: String,
  singer: String
});

module.exports = mongoose.model("Bhajan", bhajanSchema);
