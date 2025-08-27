const mongoose = require('mongoose')

const recSchema = new mongoose.Schema({
  patientUhid: { type: String, required: true },
  fileUrl: String,   // S3 URL
  fileHash: String,  // blockchain hash
  uploadedBy: String, // doctor/admin ID
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('MedicalRecord', recSchema)
