import Task from "../models/Task.js";

async function getAllTasks(req, res) {
  try {
    const userId = req.user.userId;
    const filters = {};
    if (req.query.date) {
      filters.date = req.query.date;
    }
    if (req.query.status) {
      filters.status = req.query.status;
    }

    const tasks = await Task.getAllTasks(userId, filters);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getTaskById(req, res) {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;
    const task = await Task.getTaskById(taskId, userId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createTask(req, res) {
  try {
    const title = req.body.title;
    const userId = req.user.userId;
    const date = new Date(req.body.date).toISOString();
    const task = await Task.createTask({ title, date }, userId);
    res.status(201).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

async function updateTask(req, res) {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;
    const statuses = ["pending", "in-progress", "completed", "pushed"];

    if (!req.body) {
      return res.status(400).json({
        error: "Missing required fields. Must include title or status.",
      });
    }
    if (req.body.title !== undefined) {
      const task = await Task.updateTaskTitle(taskId, req.body.title, userId);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
    }
    if (req.body.status !== undefined) {
      if (!statuses.includes(req.body.status)) {
        return res.status(400).json({
          error: `Invalid status. Must be one of ${statuses.join(", ")}`,
        });
      }
      const task = await Task.updateTaskStatus(taskId, req.body.status, userId);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
    }
    const updatedTask = await Task.getTaskById(taskId, userId);
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteTask(req, res) {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;
    const deletedTask = await Task.deleteTask(taskId, userId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(deletedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
