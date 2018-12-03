const mongoose = require('mongoose')

const UserSchema = mongoose.model('User', {
	fullName: String,
  username: String,
  password: String,
  role: String,
  email: String,
  phoneNumber: String,
  claims: [ClaimSchema],
  property: [PropertySchema]
})

module.exports = { UserSchema }
