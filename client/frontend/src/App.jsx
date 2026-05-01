 import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import MyTasks from "./pages/MyTasks";

import AppLayout from "./components/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <AppLayout>
        <Dashboard />
      </AppLayout>
    ),
  },
  {
    path: "/projects",
    element: (
      <AppLayout>
        <Projects />
      </AppLayout>
    ),
  },
  {
    path: "/project/:id",
    element: (
      <AppLayout>
        <ProjectDetails />
      </AppLayout>
    ),
  },
  {
    path: "/my-tasks",
    element: (
      <AppLayout>
        <MyTasks />
      </AppLayout>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;