 import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import {
  UserPlus,
  ClipboardPlus,
  Trash2,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [memberEmail, setMemberEmail] = useState("");

  const [addingMember, setAddingMember] = useState(false);
  const [creatingTask, setCreatingTask] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [pageRefreshing, setPageRefreshing] = useState(false);

  const [notify, setNotify] = useState({
    show: false,
    text: "",
  });

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    assignedTo: "",
  });

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    setPageRefreshing(true);
    await Promise.all([fetchTasks(), fetchProjectDetails()]);
    setPageRefreshing(false);
  };

  const showNotification = (message) => {
    setNotify({ show: true, text: message });
    setTimeout(() => {
      setNotify({ show: false, text: "" });
    }, 2500);
  };

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
    setAddingMember(true);

    try {
      await API.put("/projects/add-member", {
        projectId: id,
        email: memberEmail,
      });

      setMemberEmail("");
      await fetchProjectDetails();
      showNotification("Team member added successfully.");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add member");
    } finally {
      setAddingMember(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setCreatingTask(true);

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

      await fetchTasks();
      showNotification("Task allocated successfully.");
    } catch (error) {
      alert(error.response?.data?.message || "Task creation failed");
    } finally {
      setCreatingTask(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm("Delete this task permanently?");
    if (!confirmDelete) return;

    setDeletingTaskId(taskId);

    try {
      await API.delete(`/tasks/delete/${taskId}`);
      await fetchTasks();
      showNotification("Task removed successfully.");
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    } finally {
      setDeletingTaskId(null);
    }
  };

  const getPriorityColor = (priority) => {
    if (priority === "High") return "bg-red-50 text-red-600";
    if (priority === "Medium") return "bg-yellow-50 text-yellow-700";
    return "bg-emerald-50 text-emerald-600";
  };

  const getPriorityMeaning = (priority) => {
  if (priority === "High") return "High Priority";
  if (priority === "Medium") return "Medium Priority";
  return "Low Priority";
};

  return (
    <div className="space-y-8">
      {notify.show && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2">
          <CheckCircle2 size={18} />
          {notify.text}
        </div>
      )}

      {pageRefreshing && (
        <div className="rounded-2xl bg-blue-50 text-blue-700 px-5 py-3 text-sm flex items-center gap-2 border border-blue-100">
          <Loader2 size={16} className="animate-spin" />
          Updating workspace records, please wait...
        </div>
      )}

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

          <p className="text-xs text-gray-400 mb-4">
            Add a registered teammate using their account email to include them
            in this workspace.
          </p>

          <form onSubmit={handleAddMember} className="space-y-4">
            <input
              type="email"
              placeholder="Enter member email"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
              className="w-full bg-[#f6f7fb] border border-gray-200 p-3.5 rounded-2xl outline-none focus:border-indigo-400"
              required
            />
            <button
              disabled={addingMember}
              className={`w-full py-3 rounded-2xl text-white flex justify-center items-center gap-2 ${
                addingMember ? "bg-gray-500 cursor-not-allowed" : "bg-black"
              }`}
            >
              {addingMember && <Loader2 size={16} className="animate-spin" />}
              {addingMember ? "Adding member..." : "Add Member"}
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

          <div className="bg-blue-50 border border-blue-100 text-blue-700 text-sm rounded-2xl px-4 py-3 mb-5">
            Fill the details below to allocate work with a clear deadline and
            execution priority.
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
              <option value="">Select member</option>
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

            <button
              disabled={creatingTask}
              className={`md:col-span-2 py-3 rounded-2xl text-white flex justify-center items-center gap-2 ${
                creatingTask ? "bg-gray-500 cursor-not-allowed" : "bg-black"
              }`}
            >
              {creatingTask && <Loader2 size={16} className="animate-spin" />}
              {creatingTask ? "Allocating task, please wait..." : "Assign Task"}
            </button>
          </form>
        </div>
      </div>

      {/* Assigned Tasks */}
      <div className="bg-white rounded-3xl shadow-sm p-7 border border-gray-100">
        <h2 className="text-xl font-semibold mb-2">Assigned Tasks</h2>
        <p className="text-sm text-gray-400 mb-6">
          Monitor current allocations, submission deadlines and execution progress.
        </p>

        {tasks.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-5">
            {tasks.map((task) => {
              const isOverdue =
                new Date(task.dueDate) < new Date() &&
                task.status !== "Completed";

              return (
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
                        {getPriorityMeaning(task.priority)}
                      </span>

                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        disabled={deletingTaskId === task._id}
                        className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
                      >
                        {deletingTaskId === task._id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mb-5">
                    {task.description || "No task description provided."}
                  </p>

                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex justify-between bg-white rounded-2xl px-4 py-3 border border-gray-100">
                      <span className="text-gray-500">Responsible Member</span>
                      <span className="font-medium">{task.assignedTo?.name}</span>
                    </div>

                    <div className="flex justify-between bg-white rounded-2xl px-4 py-3 border border-gray-100">
                      <span className="text-gray-500">Final Deadline</span>
                      <span className="font-medium">
                        {new Date(task.dueDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex justify-between bg-white rounded-2xl px-4 py-3 border border-gray-100">
                      <span className="text-gray-500">Current Status</span>
                      <span className="font-medium">{task.status}</span>
                    </div>

                    {isOverdue && (
                      <div className="bg-red-50 text-red-600 text-xs px-4 py-3 rounded-2xl border border-red-100">
                        Deadline has passed. Pending execution requires attention.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-sm text-gray-400 bg-[#f8f9fc] rounded-2xl p-8 text-center">
            No tasks assigned yet. Add team members and allocate the first deliverable to begin collaboration.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;