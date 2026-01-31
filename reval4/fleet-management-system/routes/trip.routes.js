const express = require('express')
const router = express.Router()
const {
  createTrip,
  endTrip,
  getTrip,
  deleteTrip
} = require('../controllers/trip.controller')

router.post('/create', createTrip)
router.patch('/end/:tripId', endTrip)
router.get('/:tripId', getTrip)
router.delete('/delete/:tripId', deleteTrip)

module.exports = router
