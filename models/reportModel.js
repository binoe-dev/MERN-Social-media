const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema(
  {
    reason: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('report', reportSchema)
