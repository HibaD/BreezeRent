const mongoose = require('mongoose')



const PropertySchema = mongoose.model('Property', {
	address: String,
	notices: [NoticeSchema],
  capacity: Number
})

module.exports = { PropertySchema }
