import pool from "./pool.js";

async function getAllTasks(userId, filters = {}) {
  let query = "SELECT * FROM tasks";
  const values = [userId];
  const conditions = ["user_id = $1"];

  if (filters.date) {
    conditions.push(`task_date = $${values.length + 1}`);
    values.push(filters.date);
  }

  if (filters.status) {
    conditions.push(`status = $${values.length + 1}`);
    values.push(filters.status);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  query += " ORDER BY created_at ASC";

  const result = await pool.query(query, values);
  return result.rows;
}

async function getTaskById(taskId, userId) {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
    [taskId, userId]
  );
  return result.rows[0];
}

async function createTask(taskData, userId) {
  const { title, date } = taskData;
  const result = await pool.query(
    "INSERT INTO tasks (title, task_date, user_id) VALUES ($1, $2, $3) RETURNING *",
    [title, date, userId]
  );
  return result.rows[0];
}

async function updateTaskTitle(taskId, title, userId) {
  const result = await pool.query(
    "UPDATE tasks SET title = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
    [title, taskId, userId]
  );
  return result.rows[0];
}

async function updateTaskStatus(taskId, status, userId) {
  const result = await pool.query(
    "UPDATE tasks SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
    [status, taskId, userId]
  );
  return result.rows[0];
}

async function deleteTask(taskId, userId) {
  const result = await pool.query(
    "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
    [taskId, userId]
  );
  return result.rows[0];
}

export default {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskTitle,
  updateTaskStatus,
  deleteTask,
};
