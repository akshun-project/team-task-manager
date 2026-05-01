 import React, { useEffect, useState } from "react";
import API from "../api/axios";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const fetchMyTasks = async () => {
    try {
      const { data } = await API.get("/tasks/my-tasks");
      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      await API.put(`/tasks/update-status/${taskId}`, { status });
      fetchMyTasks();
    } catch (error) {
      console.log(error.response?.data || error);
      alert(error.response?.data?.message || "Status update failed");
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
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-6">
        <h1 className="text-3xl font-semibold mb-1">My Assigned Tasks</h1>
        <p className="text-sm text-gray-500">
          Review assigned work items, monitor due dates and regularly update your execution progress.
        </p>
      </div>

      {/* Task List */}
      {tasks.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-5">
          {tasks.map((task) => (
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
                  <span className="font-medium">{task.project?.title || "General Task"}</span>
                </div>

                <div className="flex justify-between bg-[#f6f7f8] rounded-2xl px-4 py-3">
                  <span className="text-gray-500">Due On</span>
                  <span className="font-medium">
                    {new Date(task.dueDate).toLocaleDateString()}
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
              </div>

              <div className="mb-2 text-sm font-medium text-gray-600">
                Update My Progress
              </div>

              <select
                value={task.status}
                onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                className="w-full bg-[#f3f4f6] p-3 rounded-2xl outline-none"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-12 text-center text-gray-400">
          No tasks assigned yet.
        </div>
      )}
    </div>
  );
};

export default MyTasks;