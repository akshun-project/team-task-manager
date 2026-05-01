 import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
// import { UserPlus, ClipboardPlus, Users2, CalendarDays } from "lucide-react";
import { UserPlus, ClipboardPlus, Trash2 } from "lucide-react";
const ProjectDetails = () => {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [memberEmail, setMemberEmail] = useState("");

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    assignedTo: "",
  });

  useEffect(() => {
    fetchTasks();
    fetchProjectDetails();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get(`/tasks/project/${id}`);
      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjectDetails = async () => {
    try {
      const { data } = await API.get("/projects/my-projects");
      const currentProject = data.projects.find((p) => p._id === id);
      setProject(currentProject);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();

    try {
      await API.put("/projects/add-member", {
        projectId: id,
        email: memberEmail,
      });
      setMemberEmail("");
      fetchProjectDetails();
    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks/create", {
        ...taskForm,
        projectId: id,
      });

      setTaskForm({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
        assignedTo: "",
      });

      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Task creation failed");
    }
  };
const handleDeleteTask = async (taskId) => {
  const confirmDelete = window.confirm("Delete this task permanently?");
  if (!confirmDelete) return;

  try {
    await API.delete(`/tasks/delete/${taskId}`);
    fetchTasks();
  } catch (error) {
    alert(error.response?.data?.message || "Delete failed");
  }
};
  const getPriorityColor = (priority) => {
    if (priority === "High") return "bg-red-50 text-red-600";
    if (priority === "Medium") return "bg-yellow-50 text-yellow-700";
    return "bg-emerald-50 text-emerald-600";
  };

  return (
    <div className="space-y-8">

      {/* Project Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 text-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
        <h1 className="text-3xl font-bold mb-2">{project?.title}</h1>
        <p className="text-sm opacity-80 max-w-2xl">{project?.description}</p>

        <div className="flex gap-3 flex-wrap mt-5">
          {project?.members?.map((member) => (
            <span
              key={member._id}
              className="px-4 py-1.5 bg-white/10 border border-white/10 rounded-full text-xs"
            >
              {member.name}
            </span>
          ))}
        </div>
      </div>

      {/* Forms */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Add Member */}
        <div className="bg-white rounded-3xl shadow-sm p-7 h-fit border border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600">
              <UserPlus size={18} />
            </div>
            <h2 className="text-lg font-semibold">Add Team Member</h2>
          </div>

          <form onSubmit={handleAddMember} className="space-y-4">
            <input
              type="email"
              placeholder="Enter member email"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
              className="w-full bg-[#f6f7fb] border border-gray-200 p-3.5 rounded-2xl outline-none focus:border-indigo-400"
              required
            />
            <button className="w-full bg-black text-white py-3 rounded-2xl">
              Add Member
            </button>
          </form>
        </div>

        {/* Create Task */}
        <div className="md:col-span-2 bg-white rounded-3xl shadow-sm p-7 border border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
              <ClipboardPlus size={18} />
            </div>
            <h2 className="text-lg font-semibold">Assign New Task</h2>
          </div>

          <form onSubmit={handleCreateTask} className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Task title"
              value={taskForm.title}
              onChange={(e) =>
                setTaskForm({ ...taskForm, title: e.target.value })
              }
              className="bg-[#f6f7fb] border border-gray-200 p-3.5 rounded-2xl outline-none"
              required
            />

            <select
              value={taskForm.assignedTo}
              onChange={(e) =>
                setTaskForm({ ...taskForm, assignedTo: e.target.value })
              }
              className="bg-[#f6f7fb] border border-gray-200 p-3.5 rounded-2xl outline-none"
              required
            >
              <option value="">Select Member</option>
              {project?.members?.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={taskForm.dueDate}
              onChange={(e) =>
                setTaskForm({ ...taskForm, dueDate: e.target.value })
              }
              className="bg-[#f6f7fb] border border-gray-200 p-3.5 rounded-2xl outline-none"
              required
            />

            <select
              value={taskForm.priority}
              onChange={(e) =>
                setTaskForm({ ...taskForm, priority: e.target.value })
              }
              className="bg-[#f6f7fb] border border-gray-200 p-3.5 rounded-2xl outline-none"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <textarea
              placeholder="Task description"
              value={taskForm.description}
              onChange={(e) =>
                setTaskForm({ ...taskForm, description: e.target.value })
              }
              className="bg-[#f6f7fb] border border-gray-200 p-3.5 rounded-2xl md:col-span-2 h-24 outline-none resize-none"
            />

            <button className="md:col-span-2 bg-black text-white py-3 rounded-2xl">
              Assign Task
            </button>
          </form>
        </div>
      </div>

      {/* Assigned Tasks */}
      <div className="bg-white rounded-3xl shadow-sm p-7 border border-gray-100">
        <h2 className="text-xl font-semibold mb-6">Assigned Tasks</h2>

 {tasks.length > 0 ? (
  <div className="grid md:grid-cols-2 gap-5">
    {tasks.map((task) => (
      <div
        key={task._id}
        className="rounded-3xl p-6 bg-gradient-to-br from-[#fafbff] to-[#f3f5fa] border border-gray-200 hover:shadow-md transition"
      >
        <div className="flex justify-between items-start mb-3 gap-3">
          <h3 className="font-semibold text-lg">{task.title}</h3>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-3 py-1.5 rounded-full font-medium ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>

            <button
              onClick={() => handleDeleteTask(task._id)}
              className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-5">
          {task.description || "No task description provided."}
        </p>

        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between bg-white rounded-2xl px-4 py-3 border border-gray-100">
            <span className="text-gray-500">Assigned Member</span>
            <span className="font-medium">{task.assignedTo?.name}</span>
          </div>

          <div className="flex justify-between bg-white rounded-2xl px-4 py-3 border border-gray-100">
            <span className="text-gray-500">Submission Deadline</span>
            <span className="font-medium">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between bg-white rounded-2xl px-4 py-3 border border-gray-100">
            <span className="text-gray-500">Current Status</span>
            <span className="font-medium">{task.status}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="text-sm text-gray-400 bg-[#f8f9fc] rounded-2xl p-8 text-center">
    No tasks created yet.
  </div>
)}
      </div>
    </div>
  );
};

export default ProjectDetails;