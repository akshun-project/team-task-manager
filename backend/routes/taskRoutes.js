import express from "express";
import {
  createTask,
  getProjectTasks,
  updateTaskStatus,
  deleteTask,
  getMyAssignedTasks,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createTask);
router.get("/project/:projectId", protect, getProjectTasks);
router.put("/update-status/:taskId", protect, updateTaskStatus);
router.delete("/delete/:taskId", protect, deleteTask);
router.get("/my-tasks", protect, getMyAssignedTasks);

export default router;