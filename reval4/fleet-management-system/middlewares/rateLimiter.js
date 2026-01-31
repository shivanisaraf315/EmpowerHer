const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 3,
  message: 'Too many requests. Try again later.'
})

module.exports = limiter
