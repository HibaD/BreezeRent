const mongoose = require('mongoose')

const PropertySchema = mongoose.model('Property', {
	address: String,
	notices: [String],
  capacity: Number
})

module.exports = { PropertySchema }
