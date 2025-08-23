import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

async function register(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }
    const user = await User.createUser(email, password);
    res
      .status(201)
      .json({ message: "User registered successfully", userId: user.id });
  } catch (err) {
    if (err.code == "23505") {
      res.status(409).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }
    const isValid = await User.validatePassword(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "24h",
    });
    // Set httpOnly cookie
    res.cookie("authToken", token, {
      httpOnly: true, // Can't access via JavaScript
      secure: process.env.NODE_ENV === "production", // HTTPS only
      sameSite: "strict", // CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // Expires in milliseconds
      path: "/", // Available on all routes
    });
    console.log("Cookie set for user:", user.email); // Add this debug line
    res.json({
      // token,
      user: { userId: user.id, email: user.email },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function logout(req, res) {
  // Clear the cookie
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  res.json({ message: "Logged out successfully" });
}

async function checkAuth(req, res) {
  // verifyToken middleware sets req.user if token is valid
  // If get to here (no error), then the token is valid
  res.json({
    user: req.user,
  });
}

export default {
  register,
  login,
  logout,
  checkAuth,
};
