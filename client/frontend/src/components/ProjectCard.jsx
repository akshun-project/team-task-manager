 import React from "react";
import { ArrowUpRight, Users2, FolderKanban, Trash2 } from "lucide-react";

const ProjectCard = ({ project, onOpen, onDelete }) => {
  return (
    <div className="group rounded-3xl p-6 bg-gradient-to-br from-[#fafbff] to-[#f2f4f9] border border-gray-200 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
      
      {/* top */}
      <div className="flex justify-between items-start mb-5">
        <div
          onClick={onOpen}
          className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 cursor-pointer"
        >
          <FolderKanban size={20} />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onDelete}
            className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
          >
            <Trash2 size={14} />
          </button>

          <div onClick={onOpen} className="text-gray-400 group-hover:text-black transition cursor-pointer">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>

      {/* title */}
      <h2
        onClick={onOpen}
        className="text-lg font-semibold mb-2 tracking-tight line-clamp-1 cursor-pointer"
      >
        {project.title}
      </h2>

      {/* desc */}
      <p
        onClick={onOpen}
        className="text-sm text-gray-500 mb-6 leading-relaxed line-clamp-2 min-h-[42px] cursor-pointer"
      >
        {project.description || "No project description added for this workspace."}
      </p>

      {/* footer */}
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-gray-200 text-gray-600">
          <Users2 size={13} />
          {project.members?.length} Members
        </div>

        <span
          onClick={onOpen}
          className="font-medium text-gray-700 group-hover:translate-x-1 transition cursor-pointer"
        >
          Open Workspace
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;