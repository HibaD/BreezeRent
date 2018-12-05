const mongoose = require('mongoose')

// connect to our database
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/RentAPI'

//mongoose.connect('mongodb://localhost:27017/RentAPI', { useNewUrlParser: true});
mongoose.connect(mongoURI, { useNewUrlParser: true});

module.exports = { mongoose }