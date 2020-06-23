const mongoose = require('mongoose')

const DraftSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Draft', DraftSchema)
