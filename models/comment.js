const mongoose = require('mongoose')

const CommentSchema = mongoose.model('Comments', {
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
	content: String
})

module.exports = { CommentSchema }
