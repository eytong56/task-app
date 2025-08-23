import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import taskRouter from "./routes/tasks.js";

const app = express();

app.use(cookieParser());

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
// app.use((req, res, next) => {
//   const start = Date.now();
//   res.on("finish", () => {
//     const duration = Date.now() - start;
//     console.log(`${req.method} ${req.query.date ? req.query.date : ""} ${req.path} - ${duration}ms`);
//   });
//   next();
// });

// Routes
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

// TODO: Error handling middleware

// TODO: 404 handler

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
