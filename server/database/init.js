import pool from "../src/models/pool.js";

const INIT_SQL = `
-- Create table
CREATE TYPE task_status AS ENUM ('pending', 'in-progress', 'completed', 'pushed');

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  task_date DATE,
  status task_status DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO tasks (title, task_date) VALUES
  ('Go grocery shopping', '2025-05-25'),
  ('Do laundry', '2025-05-25')
ON CONFLICT DO NOTHING;
`;

async function initDatabase() {
  await pool.query(INIT_SQL);
  console.log("Success: tasks table initialized");
}

initDatabase();
