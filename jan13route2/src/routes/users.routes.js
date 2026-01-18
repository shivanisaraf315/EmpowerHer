const express = require("express");
const fs = require("fs");
const path = require("path");

const cloudinary = require("../config/cloudinary.config");
const upload = require("../middleware/upload.middleware");
const uniqueEmailMiddleware = require("../middleware/uniqueEmail.middleware");

const router = express.Router();
const dbPath = path.join(__dirname, "..", "db.json");

function readDB() {
  const raw = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(raw || "{}");
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function generateId() {
  return Date.now().toString();
}

function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "masai-users", resource_type: "image" },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}

router.post(
  "/signup",
  upload.single("profile"),
  uniqueEmailMiddleware,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !password) {
        return res.status(400).json({ error: "name and password are required" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "Profile image is required" });
      }

      const uploaded = await uploadToCloudinary(req.file.buffer);

      const db = readDB();
      if (!db.users) db.users = [];

      const newUser = {
        id: generateId(),
        name: String(name).trim(),
        email,
        password: String(password),
        profilePic: uploaded.secure_url,
      };

      db.users.push(newUser);
      writeDB(db);

      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          profilePic: newUser.profilePic,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: "Signup failed", details: err.message });
    }
  }
);

module.exports = router;
