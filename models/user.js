const mongoose = require('mongoose')

const { Property } = require('property')
const { Claim } = require('claim')

const UserSchema = mongoose.model('User', {
	fullName: String,
  username: String,
  password: String,
  role: String,
  email: String,
  phoneNumber: String,
  claims: [Claim],
  property: [Property]
})

module.exports = { UserSchema }
