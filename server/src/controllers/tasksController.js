import Task from "../models/Task.js";

async function getAllTasks(req, res) {
  try {
    const filters = {};
    if (req.query.date) {
      filters.date = req.query.date;
    }
    if (req.query.status) {
      filters.status = req.query.status;
    }

    const tasks = await Task.getAllTasks(filters);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
}

async function getTaskById(req, res) {
  const task = await Task.getTaskById(req.params.id);
  res.json(task);
}

async function createTask(req, res) {
  const title = req.body.title;
  const date = new Date(req.body.date).toISOString();
  const task = await Task.createTask({ title, date });
  res.json(task);
}

async function updateTask(req, res) {
  try {
    const statuses = ["pending", "in-progress", "completed", "pushed"];

    if (!req.body) {
      return res
        .status(400)
        .json({
          error: "Missing required fields. Must include title or status.",
        });
    }
    if (req.body.title !== undefined) {
      await Task.updateTaskTitle(req.params.id, req.body.title);
    }
    if (req.body.status !== undefined) {
      if (!statuses.includes(req.body.status)) {
        return res.status(400).json({
          error: `Invalid status. Must be one of ${statuses.join(", ")}`,
        });
      }
      await Task.updateTaskStatus(req.params.id, req.body.status);
    }
    const updatedTask = await Task.getTaskById(req.params.id);
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTask(req, res) {
  try {
    const deletedTask = await Task.deleteTask(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
