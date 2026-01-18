function validateTodoMiddleware(req, res, next) {
  const body = req.body;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({
      error: "Invalid request body. Only 'title' is allowed",
    });
  }

  const keys = Object.keys(body);

  if (keys.length !== 1 || keys[0] !== "title") {
    return res.status(400).json({
      error: "Invalid request body. Only 'title' is allowed",
    });
  }

  if (typeof body.title !== "string" || body.title.trim().length === 0) {
    return res.status(400).json({
      error: "Invalid request body. Only 'title' is allowed",
    });
  }

  req.body.title = body.title.trim();
  next();
}

module.exports = validateTodoMiddleware;
