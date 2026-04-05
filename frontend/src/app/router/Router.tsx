import { createBrowserRouter, Navigate } from "react-router-dom";

import { LoginPage } from "@/auth/pages/LoginPage";
import { RegisterPage } from "@/auth/pages/RegisterPage";

import HomePage from "@/dashboard/pages/HomePage";
import HealthMetricsPage from "@/healthMetrics/pages/HealthMetricsPage";
import { MedicationsPage } from "@/medication/pages/MedicationPage";
import WeeklyPillboxPage from "@/weeklyPillbox/pages/WeeklyPillboxPage";

import { PublicRoute } from "./routes/PublicRoute";
import { ProtectedRoute } from "./routes/ProtectedRoute";


//util para que si no hay token redirija a login de una
const RootRedirect = () => {
  const token = localStorage.getItem("token");

  return token
    ? <Navigate to="/home" replace />
    : <Navigate to="/login" replace />;
};


export const appRouter = createBrowserRouter([

 
  {
    path: "/",
    element: <RootRedirect />
  },

 
  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ]
  },

  {
    element: <ProtectedRoute />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/medications", element: <MedicationsPage /> },
      { path: "/pillbox", element: <WeeklyPillboxPage /> },
      { path: "/metrics", element: <HealthMetricsPage /> },
    ]
  },

]);
