const mongoose = require('mongoose')

const PropertySchema = mongoose.model('Property', {
	address: {
		type: String
	},
	notices: {
		type: [NoticeSchema]
	},
  capacity: {
    type : Number
  }
})

module.exports = { PropertySchema }
