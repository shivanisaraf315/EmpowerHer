import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

// Middleware to read JSON body
app.use(express.json());

// db.json path
const dbPath = path.join(process.cwd(), "db.json");

// Helper: read db.json
function readDB() {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
}

// Helper: write db.json
function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
}

// ✅ GET /students - Fetch all students
app.get("/students", (req, res) => {
  const db = readDB();
  res.status(200).json({
    message: "Students fetched successfully",
    students: db.students,
  });
});

// ✅ POST /students - Add new student
app.post("/students", (req, res) => {
  const { id, name, course, year } = req.body;

  // Validation
  if (!id || !name || !course || !year) {
    return res.status(400).json({ message: "All fields are required: id, name, course, year" });
  }

  const db = readDB();

  // Check duplicate id
  const exists = db.students.find((s) => s.id === id);
  if (exists) {
    return res.status(409).json({ message: `Student with id ${id} already exists` });
  }

  const newStudent = { id, name, course, year };
  db.students.push(newStudent);
  writeDB(db);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent,
  });
});

// ✅ PUT /students - Update student using id (from body)
app.put("/students", (req, res) => {
  const { id, name, course, year } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Student id is required to update" });
  }

  const db = readDB();
  const studentIndex = db.students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: `Student with id ${id} not found` });
  }

  // Update only provided fields
  if (name) db.students[studentIndex].name = name;
  if (course) db.students[studentIndex].course = course;
  if (year) db.students[studentIndex].year = year;

  writeDB(db);

  res.status(200).json({
    message: "Student updated successfully",
    student: db.students[studentIndex],
  });
});

// ✅ DELETE /students/:id - Delete student by id
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const db = readDB();
  const studentIndex = db.students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: `Student with id ${id} not found` });
  }

  const deletedStudent = db.students.splice(studentIndex, 1)[0];
  writeDB(db);

  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
