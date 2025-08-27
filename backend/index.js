require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const User = require('./models/User')

const app = express()

// Allow React frontend (localhost:3000) to access backend
app.use(cors({ origin: "http://localhost:3000" }))
app.use(bodyParser.json())

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Mongo error', err))

// Default route
app.get('/', (req, res) => res.send('MedVault API running'))

// Register route
app.post('/api/register', async (req, res) => {
  try {
    const { name, role, walletAddress } = req.body
    const uhid = 'UHID-' + Date.now().toString(36)
    const user = new User({ name, role, walletAddress, uhid })
    await user.save()
    res.json({ ok: true, user })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
