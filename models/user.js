const mongoose = require('mongoose');
const validator = require('validator')

const CommentSchema = new mongoose.Schema({
  author: {
    type: String
  },
	content: {
		type: String
	}
})

const ClaimSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  },
	title: {
		type: String,
		required: true
	},
	detail: {
		type: String,
		required: true
	},
  status: {
		type: String,
		required: true
	},
  comments: [CommentSchema]
})


const PropertySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	landlord: {
		type: String,
		required: true
	},
	address: {
		type: String,
		trim: true,
		required: true
	},
	notices: [String],
  capacity: {
		type: Number,
		required: true
	},
	// Due to the structure, we need to make this
	// list of username instead of userSchema
	tenants: [String]
})

//creating user Schema
const userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true
	},
	username: {
		type: String,
		trim: true,
		unique: true,
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
	claims: [ClaimSchema],
	property: [PropertySchema]
	//claims: [Claim.schema],
	//property: [mongoose.model('Property').schema]
})


//create the model to use the schema
const User = mongoose.model ('User', userSchema)
const Property = mongoose.model('Property', PropertySchema)
const Comments = mongoose.model('Comments', CommentSchema)
const Claim = mongoose.model('Claim', ClaimSchema)

//make available to users in Node app
module.exports = { User, Property, Comments, Claim };
