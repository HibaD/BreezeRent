const mongoose = require('mongoose')

const UserSchema = mongoose.model('User', {
	fullName: {
		type: String
	},
  username: {
		type: String
	},
  password: {
		type: String
	},
  role: {
		type: String
	},
  email: {
		type: String
	},
  phoneNumber: {
		type: String
	},
  claims: {
		type: [ClaimSchema]
	},
  property: {
		type: [PropertySchema]
	}
})

module.exports = { UserSchema }
