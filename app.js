require('dotenv').config();
const db = require('./config/database');
const Movie = require('./models/movie');
const Actor = require('./models/actor');

const movie = {
  title: 'Pineapple Express',
  rated: 'R',
  director: 'David Gordon Green',
  genre: ['Comedy', 'Action', 'Crime'],
  releaseDate: new Date('2008-08-01'),
  actors: [],
  posters: [
    {
      img: 'https://m.media-amazon.com/images/I/91GvEK0DffS._SX342_.jpg',
    },
    {
      img: 'https://target.scene7.com/is/image/Target/GUEST_f13d2d62-acab-489f-a630-7ed1b59ea191?wid=325&hei=325&qlt=80&fmt=pjpeg',
    },
    {
      img: 'https://images.fineartamerica.com/images-medium-5/no264-my-pineapple-express-minimal-movie-poster-chungkong-art.jpg',
    },
  ],
  runtime: 111,
  ratings: [],
};

const createMovie = async (movie) => {
  try {
    const createdMovie = await Movie.create(movie);
    console.log(createdMovie);
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
};
//createMovie(movie);

//==============Emebeddind documents===============

//Adding a embedded document to the movie
const addRating = async (title, rating) => {
  try {
    const updatedMovie = await Movie.findOneAndUpdate(
      { title: title },
      { $push: { ratings: rating } },
      { new: true }
    );
    console.log(updatedMovie);
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
};
// addRating('Pineapple Express', {
//   stars: 3
//   review: 'very immature',
// });

// Creating the actor and referencing the Actor in the movie
const james = {
  name: 'James Franco',
  age: 45,
  bio: 'Green Goblin',
  birthday: new Date('1978-04-19'),
};

const createActor = async (actor) => {
  try {
    const createdActor = await Actor.create(actor);
    console.log(createdActor);
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
};
// createActor(james);

const addActor = async (title, name) => {
  try {
    const { _id } = await Actor.findOne({ name: name }, '_id');
    const updatedMovie = await Movie.findOneAndUpdate(
      { title: title },
      { $addToSet: { actors: _id } },
      { new: true }
    );
    console.log(updatedMovie);
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
};
// addActor('Pineapple Express', 'Seth Rogen');

// Querying the Movie document and populating the actors

const findMovie = async (title) => {
  try {
    // make sure that the arg for the populate method matche the Schema exactly.
    const foundMovie = await Movie.findOne({ title }).populate('actors');
    console.log(foundMovie);
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
};
// findMovie('Pineapple Express');
// setTimeout(() => {
//   db.close();
// }, 5000);
