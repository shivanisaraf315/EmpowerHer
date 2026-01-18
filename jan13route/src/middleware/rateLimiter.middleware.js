function createRateLimiter({ limit, windowMs }) {
  let windowStart = Date.now();
  let count = 0;

  return function rateLimiter(req, res, next) {
    const now = Date.now();

    if (now - windowStart >= windowMs) {
      windowStart = now;
      count = 0;
    }

    count += 1;

    if (count > limit) {
      return res.status(429).json({
        error: "Too many requests, please try again later",
      });
    }

    next();
  };
}

const rateLimiterMiddleware = createRateLimiter({
  limit: 15,
  windowMs: 60 * 1000,
});

module.exports = rateLimiterMiddleware;
