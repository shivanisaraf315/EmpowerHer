const supabase = require('../config/supabase')

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (!['customer', 'owner', 'driver'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' })
    }

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password, role }])

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.status(201).json({ message: 'User registered successfully', data })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
