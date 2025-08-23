import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import tasksController from "../controllers/tasksController.js";

const router = Router();

// All task routes require authentication
router.use(verifyToken);

router.get("/", tasksController.getAllTasks);
router.get("/:id", tasksController.getTaskById);
router.post("/", tasksController.createTask);
router.put("/:id", tasksController.updateTask);
router.delete("/:id", tasksController.deleteTask);

export default router;
