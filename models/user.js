const mongoose = require('mongoose');
const validator = require('validator')

const { Property } = require('./property.js')
//const { Claim } = require('./claim.js')

//creating user Schema
const userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true
	},
	username: {
		type: String,
		trim: true,
		required: true
	},
	password: {
		type: String,
		required: true
		//minlength: 6
	},
	role: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true, // trim whitespace
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: 'Not valid email'
		}
	},
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
