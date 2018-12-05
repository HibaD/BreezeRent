const mongoose = require('mongoose')

const CommentSchema = mongoose.model('Comments', {
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
	content: {
		type: String
	},
})

module.exports = { CommentSchema }
