import pool from "../src/models/pool.js";

const USERS_INIT_SQL = `
-- Create table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
`;

const TASKS_INIT_SQL = `
-- Create table
CREATE TYPE task_status AS ENUM ('pending', 'in-progress', 'completed', 'pushed');

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  task_date DATE,
  status task_status DEFAULT 'pending',
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks (user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks (status);
`

const DATA_INIT_SQL = `
-- Insert sample data
INSERT INTO tasks (title, task_date) VALUES
  ('Go grocery shopping', '2025-05-25'),
  ('Do laundry', '2025-05-25')
ON CONFLICT DO NOTHING;
`;

async function initDatabase() {
  const versionResult = await pool.query("SELECT version()");
  console.log("PostgreSQL version:", versionResult.rows[0].version);
  await pool.query(USERS_INIT_SQL);
  await pool.query(TASKS_INIT_SQL);
  console.log("Success: database initialized");
}

initDatabase();
