const supabase = require('../config/supabase')

exports.createTrip = async (req, res) => {
  const { customer_id, vehicle_id, distance_km, passengers } = req.body

  const { data: vehicle } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', vehicle_id)
    .single()

  if (!vehicle || !vehicle.isAvailable) {
    return res.status(400).json({ message: 'Vehicle not available' })
  }

  if (passengers > vehicle.allowed_passengers) {
    return res.status(400).json({ message: 'Passenger limit exceeded' })
  }

  await supabase.from('vehicles').update({ isAvailable: false }).eq('id', vehicle_id)

  const { data, error } = await supabase.from('trips').insert([
    { customer_id, vehicle_id, distance_km, passengers }
  ])

  if (error) return res.status(400).json({ error: error.message })

  res.status(201).json({ message: 'Trip created', data })
}

exports.endTrip = async (req, res) => {
  const { tripId } = req.params

  const { data: trip } = await supabase
    .from('trips')
    .select('*, vehicles(rate_per_km)')
    .eq('id', tripId)
    .single()

  const cost = trip.distance_km * trip.vehicles.rate_per_km

  await supabase.from('trips')
    .update({ isCompleted: true, tripCost: cost })
    .eq('id', tripId)

  await supabase.from('vehicles')
    .update({ isAvailable: true })
    .eq('id', trip.vehicle_id)

  res.json({ message: 'Trip ended', tripCost: cost })
}

exports.getTrip = async (req, res) => {
  const { tripId } = req.params
  const { data } = await supabase.from('trips').select('*').eq('id', tripId).single()
  res.json(data)
}

exports.deleteTrip = async (req, res) => {
  const { tripId } = req.params
  await supabase.from('trips').delete().eq('id', tripId)
  res.json({ message: 'Trip deleted' })
}
