 import React, { useEffect, useState } from "react";
import API from "../api/axios";
import ProjectCard from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";
import {
  FolderPlus,
  Layers3,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const Projects = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [projects, setProjects] = useState([]);
  const [creatingProject, setCreatingProject] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState(null);
  const [pageRefreshing, setPageRefreshing] = useState(false);

  const [notify, setNotify] = useState({
    show: false,
    text: "",
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    setPageRefreshing(true);
    await fetchProjects();
    setPageRefreshing(false);
  };

  const showNotification = (message) => {
    setNotify({ show: true, text: message });
    setTimeout(() => {
      setNotify({ show: false, text: "" });
    }, 2500);
  };

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
    setCreatingProject(true);

    try {
      await API.post("/projects/create", formData);
      setFormData({ title: "", description: "" });
      await fetchProjects();
      showNotification("Workspace created successfully.");
    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    } finally {
      setCreatingProject(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    const confirmDelete = window.confirm("Delete this entire workspace?");
    if (!confirmDelete) return;

    setDeletingProjectId(projectId);

    try {
      await API.delete(`/projects/delete/${projectId}`);
      await fetchProjects();
      showNotification("Workspace removed successfully.");
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    } finally {
      setDeletingProjectId(null);
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
      {notify.show && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2">
          <CheckCircle2 size={18} />
          {notify.text}
        </div>
      )}

      {pageRefreshing && (
        <div className="rounded-2xl bg-blue-50 text-blue-700 px-5 py-3 text-sm flex items-center gap-2 border border-blue-100">
          <Loader2 size={16} className="animate-spin" />
          Refreshing workspace records, please wait...
        </div>
      )}

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

          <p className="text-xs text-gray-400 mb-4">
            Create a workspace by defining a project name and short objective
            for your team collaboration.
          </p>

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

            <button
              disabled={creatingProject}
              className={`w-full text-white py-3 rounded-2xl font-medium transition flex justify-center items-center gap-2 ${
                creatingProject ? "bg-gray-500 cursor-not-allowed" : "bg-black"
              }`}
            >
              {creatingProject && <Loader2 size={16} className="animate-spin" />}
              {creatingProject ? "Creating workspace..." : "Create Project"}
            </button>
          </form>
        </div>

        {/* Projects List */}
        <div className="md:col-span-2 bg-white rounded-3xl shadow-sm p-7 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
              <Layers3 size={20} />
            </div>
            <h2 className="text-xl font-semibold">Active Workspaces</h2>
          </div>

          <p className="text-sm text-gray-400 mb-6">
            Open an existing workspace to manage members, assign deliverables
            and monitor progress.
          </p>

          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-5">
              {projects.map((project) => (
                <div key={project._id} className="relative">
                  <ProjectCard
                    project={project}
                    onOpen={() => navigate(`/project/${project._id}`)}
                    onDelete={() => handleDeleteProject(project._id)}
                  />

                  {deletingProjectId === project._id && (
                    <div className="absolute inset-0 rounded-3xl bg-white/70 backdrop-blur-sm flex items-center justify-center text-sm font-medium text-red-500">
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Removing workspace...
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-400 bg-[#f8f9fc] rounded-2xl p-6 text-center">
              No active projects yet. Create your first workspace to begin
              assigning team collaboration.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;