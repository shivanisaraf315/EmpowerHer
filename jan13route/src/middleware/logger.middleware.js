function formatTime(dateObj) {
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = dateObj.getFullYear();
  const mm = pad(dateObj.getMonth() + 1);
  const dd = pad(dateObj.getDate());
  const hh = pad(dateObj.getHours());
  const mi = pad(dateObj.getMinutes());
  const ss = pad(dateObj.getSeconds());
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

function loggerMiddleware(req, res, next) {
  const time = formatTime(new Date());
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = loggerMiddleware;
