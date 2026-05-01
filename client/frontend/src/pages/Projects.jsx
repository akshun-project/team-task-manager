import React, { useEffect, useState } from "react";
import API from "../api/axios";
import ProjectCard from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";
import { FolderPlus, Layers3 } from "lucide-react";

const Projects = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects/my-projects");
      setProjects(data.projects);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      await API.post("/projects/create", formData);
      setFormData({ title: "", description: "" });
      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };
  const handleDeleteProject = async (projectId) => {
    const confirmDelete = window.confirm("Delete this entire workspace?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/projects/delete/${projectId}`);
      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };
  if (user?.role !== "Admin") {
    return (
      <div className="bg-white rounded-3xl shadow-sm p-12 text-center">
        <h1 className="text-2xl font-bold mb-2">Restricted Workspace</h1>
        <p className="text-sm text-gray-500">
          Only Admin users can create and manage projects.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 text-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
        <h1 className="text-3xl font-bold mb-2">Projects Workspace</h1>
        <p className="text-sm opacity-80 max-w-2xl">
          Create collaboration rooms, structure team assignments and manage all
          active execution workspaces.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Create Project Form */}
        <div className="bg-white rounded-3xl shadow-sm p-7 h-fit border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600">
              <FolderPlus size={20} />
            </div>
            <h2 className="text-xl font-semibold">Create New Project</h2>
          </div>

          <form onSubmit={handleCreateProject} className="space-y-4">
            <input
              type="text"
              placeholder="Enter project title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full bg-[#f6f7fb] border border-gray-200 p-3.5 rounded-2xl outline-none focus:border-indigo-400"
              required
            />

            <textarea
              placeholder="Write project description..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-[#f6f7fb] border border-gray-200 p-3.5 rounded-2xl h-28 outline-none focus:border-indigo-400 resize-none"
            />

            <button className="w-full bg-black hover:opacity-95 text-white py-3 rounded-2xl font-medium transition">
              Create Project
            </button>
          </form>
        </div>

        {/* Projects List */}
        <div className="md:col-span-2 bg-white rounded-3xl shadow-sm p-7 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
              <Layers3 size={20} />
            </div>
            <h2 className="text-xl font-semibold">Active Workspaces</h2>
          </div>

          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-5">
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onOpen={() => navigate(`/project/${project._id}`)}
                  onDelete={() => handleDeleteProject(project._id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-400 bg-[#f8f9fc] rounded-2xl p-6 text-center">
              No active projects yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
