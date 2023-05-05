const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  rated: String,
  director: String,
  genre: [String],
  releaseDate: String,
  // Referencing the Actor model (Array of Actors)
  actors: [
    {
      type: Schema.Types.ObjectId, // We are useing Mongo's custom type of ObjectId
      ref: 'Actor', // ref should be equal to the model's name (the 1st arg when creating a model)
    },
  ],
  // Embedding sub-docs for posters
  posters: [
    {
      img: String,
    },
  ],
  runtime: Number,
  // Embedding sub-docs for ratings
  ratings: [
    {
      _id: Schema.Types.ObjectId,
      stars: Number,
      review: String,
    },
  ],
});

module.exports = model('Movie', movieSchema);
