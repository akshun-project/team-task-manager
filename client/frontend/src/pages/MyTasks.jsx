 import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { CheckCircle2, Loader2 } from "lucide-react";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [pageRefreshing, setPageRefreshing] = useState(false);

  const [notify, setNotify] = useState({
    show: false,
    text: "",
  });

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    setPageRefreshing(true);
    await fetchMyTasks();
    setPageRefreshing(false);
  };

  const showNotification = (message) => {
    setNotify({ show: true, text: message });
    setTimeout(() => {
      setNotify({ show: false, text: "" });
    }, 2500);
  };

  const fetchMyTasks = async () => {
    try {
      const { data } = await API.get("/tasks/my-tasks");
      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    setUpdatingTaskId(taskId);

    try {
      await API.put(`/tasks/update-status/${taskId}`, { status });
      await fetchMyTasks();
      showNotification("Task progress updated successfully.");
    } catch (error) {
      console.log(error.response?.data || error);
      alert(error.response?.data?.message || "Status update failed");
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const getPriorityColor = (priority) => {
    if (priority === "High") return "bg-red-50 text-red-600";
    if (priority === "Medium") return "bg-yellow-50 text-yellow-700";
    return "bg-emerald-50 text-emerald-600";
  };

  const getStatusColor = (status) => {
    if (status === "Done") return "bg-emerald-50 text-emerald-600";
    if (status === "In Progress") return "bg-blue-50 text-blue-600";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="space-y-6">
      {notify.show && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2">
          <CheckCircle2 size={18} />
          {notify.text}
        </div>
      )}

      {pageRefreshing && (
        <div className="rounded-2xl bg-blue-50 text-blue-700 px-5 py-3 text-sm flex items-center gap-2 border border-blue-100">
          <Loader2 size={16} className="animate-spin" />
          Refreshing assigned work records...
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-6">
        <h1 className="text-3xl font-semibold mb-1">My Assigned Tasks</h1>
        <p className="text-sm text-gray-500">
          Review assigned work items, monitor deadlines and regularly update your execution progress.
        </p>
      </div>

      {/* Task List */}
      {tasks.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-5">
          {tasks.map((task) => {
            const isOverdue =
              new Date(task.dueDate) < new Date() && task.status !== "Done";

            return (
              <div
                key={task._id}
                className="bg-white rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-6"
              >
                <div className="flex justify-between items-start mb-4 gap-3">
                  <h2 className="text-xl font-semibold">{task.title}</h2>

                  <span
                    className={`text-xs px-3 py-1.5 rounded-full font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority} Priority
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-5">
                  {task.description || "No additional task description provided."}
                </p>

                <div className="space-y-3 mb-5 text-sm text-gray-700">
                  <div className="flex justify-between bg-[#f6f7f8] rounded-2xl px-4 py-3">
                    <span className="text-gray-500">Assigned Under</span>
                    <span className="font-medium">
                      {task.project?.title || "General Task"}
                    </span>
                  </div>

                  <div className="flex justify-between bg-[#f6f7f8] rounded-2xl px-4 py-3">
                    <span className="text-gray-500">Due On</span>
                    <span className="font-medium">
                      {new Date(task.dueDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between bg-[#f6f7f8] rounded-2xl px-4 py-3">
                    <span className="text-gray-500">Progress State</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </div>

                  {isOverdue && (
                    <div className="bg-red-50 text-red-600 text-xs px-4 py-3 rounded-2xl border border-red-100">
                      Deadline has passed. Please update or complete this task.
                    </div>
                  )}
                </div>

                <div className="mb-2 text-sm font-medium text-gray-600">
                  Update My Progress
                </div>

                <div className="relative">
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                    disabled={updatingTaskId === task._id}
                    className="w-full bg-[#f3f4f6] p-3 rounded-2xl outline-none"
                  >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>

                  {updatingTaskId === task._id && (
                    <div className="absolute inset-0 rounded-2xl bg-white/70 flex items-center justify-center text-sm text-indigo-600 font-medium">
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Saving progress...
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-12 text-center text-gray-400">
          No tasks assigned yet. New work allocations will appear here.
        </div>
      )}
    </div>
  );
};

export default MyTasks;