const mongoose = require('mongoose')

const { Comments } = require('./comment.js')

const ClaimSchema = mongoose.model('Claim', {
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  },
	title: {
		type: String,
		required: true
	},
	detail: {
		type: String
		required: true
	},
  status: {
		type: String
		required: true
	},
  comments: [Comments]
})

module.exports = { ClaimSchema }
