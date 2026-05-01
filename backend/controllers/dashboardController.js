 import Task from "../models/Task.js";
import Project from "../models/Project.js";

export const getDashboardStats = async (req, res) => {
  try {
    const myProjects = await Project.find({ members: req.user._id });
    const projectIds = myProjects.map((project) => project._id);

    const tasks = await Task.find({
      project: { $in: projectIds },
    }).populate("assignedTo", "name");

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === "Done").length;
    const inProgressTasks = tasks.filter(task => task.status === "In Progress").length;
    const todoTasks = tasks.filter(task => task.status === "To Do").length;

    const overdueTasks = tasks.filter(task => {
      return new Date(task.dueDate) < new Date() && task.status !== "Done";
    }).length;

    const tasksPerUser = {};

    tasks.forEach(task => {
      const userName = task.assignedTo?.name || "Unassigned";
      tasksPerUser[userName] = (tasksPerUser[userName] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      stats: {
        totalProjects: myProjects.length,
        totalTasks,
        completedTasks,
        inProgressTasks,
        todoTasks,
        overdueTasks,
        tasksPerUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};