import React, { useEffect, useState } from "react";
import API from "../api/axios";
import StatsCard from "../components/StatsCard";
import { useNavigate } from "react-router-dom";
import {
  FolderKanban,
  CheckSquare,
  CircleCheckBig,
  Activity,
  ArrowRight,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const { data } = await API.get("/dashboard/stats");
      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  const completionRate =
    stats.totalTasks === 0
      ? 0
      : Math.round((stats.completedTasks / stats.totalTasks) * 100);

  const projectBarWidth =
    stats.totalProjects === 0 ? 0 : Math.min(stats.totalProjects * 20, 100);

  const pendingTasks = stats.totalTasks - stats.completedTasks;

  const pendingBarWidth =
    pendingTasks === 0 ? 0 : Math.min(pendingTasks * 15, 100);
  return (
    <div className="space-y-8">
      {/* Hero Executive Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-800 to-purple-900 p-8 text-white shadow-[0_10px_30px_rgba(99,102,241,0.25)] flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {user?.role === "Admin"
              ? "Management Overview"
              : "My Work Overview"}
          </h1>
          <p className="text-sm opacity-90 max-w-xl">
            {user?.role === "Admin"
              ? "Track projects, monitor team execution, and control workspace delivery performance."
              : "Review your assigned work, deadlines, and maintain consistent execution."}
          </p>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center w-28 h-28 rounded-full bg-white/10 border border-white/20">
          <span className="text-3xl font-bold">{completionRate}%</span>
          <span className="text-xs opacity-80 mt-1">Completed</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Projects"
          value={stats.totalProjects}
          subtitle="Active workspaces"
          icon={<FolderKanban size={20} />}
          gradient="bg-gradient-to-br from-slate-900 to-slate-700"
        />
        <StatsCard
          title="Total Tasks"
          value={stats.totalTasks}
          subtitle="Current assigned work"
          icon={<CheckSquare size={20} />}
          gradient="bg-gradient-to-br from-indigo-600 to-indigo-500"
        />
        <StatsCard
          title="Completed"
          value={stats.completedTasks}
          subtitle="Successfully finished"
          icon={<CircleCheckBig size={20} />}
          gradient="bg-gradient-to-br from-purple-600 to-purple-500"
        />
        <StatsCard
          title="Completion Rate"
          value={`${completionRate}%`}
          subtitle="Overall productivity"
          icon={<Activity size={20} />}
          gradient="bg-gradient-to-br from-emerald-600 to-emerald-500"
        />
      </div>

      {/* Lower Body */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Action Center */}
        <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-2">
            {user?.role === "Admin"
              ? "Workspace Command Center"
              : "Task Command Center"}
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            {user?.role === "Admin"
              ? "Control collaboration rooms, assign teams, and supervise execution."
              : "Access your work queue and update progress efficiently."}
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {user?.role === "Admin" && (
              <div
                onClick={() => navigate("/projects")}
                className="group rounded-3xl p-6 bg-gradient-to-br from-gray-50 to-gray-100 border cursor-pointer hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold mb-2">
                  Open Projects Workspace
                </h3>
                <p className="text-sm text-gray-500 mb-5">
                  Create projects, assign members and structure team
                  collaboration.
                </p>
                <div className="flex items-center gap-2 text-sm font-medium">
                  Open Module{" "}
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition"
                  />
                </div>
              </div>
            )}

            <div
              onClick={() => navigate("/my-tasks")}
              className="group rounded-3xl p-6 bg-gradient-to-br from-gray-50 to-gray-100 border cursor-pointer hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold mb-2">Review My Tasks</h3>
              <p className="text-sm text-gray-500 mb-5">
                Monitor assigned deliverables and maintain status updates.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium">
                Open Module{" "}
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Intelligence */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Performance Intelligence</h2>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Projects Running</span>
                <span>{stats.totalProjects}</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-black rounded-full transition-all duration-500"
                  style={{ width: `${projectBarWidth}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Pending Deliverables</span>
                <span>{stats.totalTasks - stats.completedTasks}</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${pendingBarWidth}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Execution Completion</span>
                <span>{completionRate}%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
