const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // e.g. doctor, patient, admin
  walletAddress: { type: String, required: true },
  uhid: { type: String, unique: true }
})

module.exports = mongoose.model('User', userSchema)
