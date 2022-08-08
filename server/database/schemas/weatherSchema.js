const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
  name: String,
  current: {},
  daily: Array,
  hourly: Array,
});

let weather = mongoose.model('weather', weatherSchema);

module.exports = weather;
