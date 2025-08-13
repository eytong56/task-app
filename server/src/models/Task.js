import pool from "./pool.js";

async function getAllTasks() {
  const { rows } = await pool.query("SELECT * FROM tasks");
  return rows;
}

async function getTaskById(id) {
  const { rows } = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
  return rows[0];
}

async function createTask(taskData) {
  const { title, date } = taskData;
  const { rows } = await pool.query(
    "INSERT INTO tasks (title, task_date) VALUES ($1, $2) RETURNING *",
    [title, date]
  );
  return rows[0];
}

async function updateTaskTitle(id, title) {
  const { rows } = await pool.query(
    "UPDATE tasks SET title = $1 WHERE id = $2 RETURNING *",
    [title, id]
  );
  return rows[0];
}

async function updateTaskStatus(id, status) {
  const { rows } = await pool.query(
    "UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  return rows[0];
}

async function deleteTask(id) {
  const { rows } = await pool.query(
    "DELETE FROM tasks WHERE id = $1 RETURNING *",
    [id]
  );
  return rows[0];
}

export default {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskTitle,
  updateTaskStatus,
  deleteTask,
};
