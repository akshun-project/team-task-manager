 import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <h2 className="text-lg font-bold">{task.title}</h2>
      <p className="text-gray-500 mb-2">{task.description}</p>

      <div className="text-sm space-y-1">
        <p><strong>Assigned To:</strong> {task.assignedTo?.name}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default TaskCard;