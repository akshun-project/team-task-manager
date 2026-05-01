import express from "express";
import {
  createProject,
getMyProjects,
addMemberToProject,
removeMemberFromProject,
deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createProject);
router.get("/my-projects", protect, getMyProjects);
router.put("/add-member", protect, addMemberToProject);
router.put("/remove-member", protect, removeMemberFromProject);
router.delete("/delete/:projectId", protect, deleteProject);
export default router;