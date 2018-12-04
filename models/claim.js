const mongoose = require('mongoose')

const { Comments } = require('comment')

const ClaimSchema = mongoose.model('Claim', {
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  },
	title: String,
	detail: String,
  status: String,
  comments: [Comments]
})

module.exports = { ClaimSchema }
