const mongoose = require('mongoose');

const { Property } = require('./property.js')
//const { Claim } = require('claim')

//creating user Schema
const userSchema = new mongoose.Schema({
	fullName: String,
	username: String,
	password: String,
	role: String,
	email: String,
	claims: [],
	property: []
	//claims: [Claim.schema],
	//property: [mongoose.model('Property').schema]
})

// add validation of users here

//check if user already exists with pre rule

//create the model to use the schema
const User = mongoose.model ('User', userSchema)

//make available to users in Node app
module.exports = { User };
