const { Schema, model } = require('mongoose');

const actorSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  age: Number,
  bio: String,
  birthday: Date,
});

module.exports = model('Actor', actorSchema);
