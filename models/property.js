const mongoose = require('mongoose')

const PropertySchema = mongoose.model('Property', {
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
})

module.exports = { PropertySchema }
