const multer = require("multer");

const storage = multer.memoryStorage();

function imageFileFilter(req, file, cb) {
  if (!file || !file.mimetype) return cb(new Error("Invalid file"), false);

  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"), false);
  }

  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

module.exports = upload;
