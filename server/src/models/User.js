import pool from "./pool.js";
import bcrypt from "bcrypt";

async function getUserByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND is_active = true",
    [email]
  );
  return result.rows[0];
}

async function createUser(email, plainPassword) {
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  const result = await pool.query(
    "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at",
    [email, hashedPassword]
  );
  return result.rows[0];
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export default {
  getUserByEmail,
  createUser,
  validatePassword
};
