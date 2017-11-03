const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  imagePath: {type: String, required: true},
  name: {type: String, required: true},
  bio: {type: String, required: true}
});

model.exports = mongoose.model('User', schema);