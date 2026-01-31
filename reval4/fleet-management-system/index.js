require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

// Logger middleware
const logger = require('./middlewares/logger')
app.use(logger)

// Routes
app.use('/users', require('./routes/user.routes'))
app.use('/vehicles', require('./routes/vehicle.routes'))
app.use('/trips', require('./routes/trip.routes'))
app.use('/analytics', require('./routes/analytics.routes'))

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "This Request Is Not Found" })
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
