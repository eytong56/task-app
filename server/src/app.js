import "dotenv/config";
import express from "express";
import cors from "cors";
import taskRouter from "./routes/tasks.js"

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Middleware
app.use(cors({
  origin: "http://localhost:5173" // Frontend URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/tasks", taskRouter);

// TODO: Error handling middleware

// TODO: 404 handler

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
