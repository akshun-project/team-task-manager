 import React from "react";
import { motion } from "framer-motion";
import { BriefcaseBusiness, CheckSquare, CircleCheckBig, Activity } from "lucide-react";

const StatsCard = ({ title, value, subtitle }) => {
  const getIcon = () => {
    if (title.toLowerCase().includes("project")) return <BriefcaseBusiness size={18} />;
    if (title.toLowerCase().includes("task")) return <CheckSquare size={18} />;
    if (title.toLowerCase().includes("completed")) return <CircleCheckBig size={18} />;
    return <Activity size={18} />;
  };

  const getGradient = () => {
    if (title.toLowerCase().includes("project")) return "from-slate-900 to-slate-700";
    if (title.toLowerCase().includes("task")) return "from-indigo-600 to-indigo-500";
    if (title.toLowerCase().includes("completed")) return "from-purple-600 to-purple-500";
    return "from-emerald-600 to-emerald-500";
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`bg-gradient-to-br ${getGradient()} rounded-3xl p-6 shadow-[0_10px_25px_rgba(0,0,0,0.08)] text-white cursor-default`}
    >
      <div className="flex justify-between items-center mb-8">
        <p className="text-sm opacity-90 tracking-wide">{title}</p>
        <div className="bg-white/15 p-3 rounded-2xl">
          {getIcon()}
        </div>
      </div>

      <h1 className="text-4xl font-bold tracking-tight mb-2">{value}</h1>
      <p className="text-xs opacity-80">{subtitle}</p>
    </motion.div>
  );
};

export default StatsCard;