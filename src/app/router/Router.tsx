import { LoginPage } from "@/auth/pages/LoginPage";
import { RegisterPage } from "@/auth/pages/RegisterPage";
import { createBrowserRouter } from "react-router-dom";


const isAuth = () => !!localStorage.getItem("token");

export const appRouter = createBrowserRouter([

  {
    path: "/",
    element: <LoginPage />
  },
  // {
  //   path: "/home",
  //   element: isAuth() ? <HomePage /> : <Navigate to="/login" />
  // },
  {
    path: "/register",
    element: <RegisterPage />
  }
]);