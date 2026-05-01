 import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#e9edf1] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-[#f3f4f6]">
        <Topbar />

        <main className="flex-1 px-8 py-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;