require("dotenv").config();

const express = require("express");
const usersRouter = require("./routes/users.routes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("User Signup API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
