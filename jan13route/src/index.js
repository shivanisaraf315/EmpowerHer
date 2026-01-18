import express from "express";
import todoRouter from "./routes/todos.routes.js";
import loggerMiddleware from "./middleware/logger.middleware.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(loggerMiddleware);

app.use("/todos", todoRouter);

app.get("/", (req, res) => {
  res.send("Todo API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
