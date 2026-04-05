import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
import type { LoginUserDto } from "../types/interfaces/login-user.interface";
import { authService } from "../services/authService";
import { handleApiError } from "../utils/handleApiError.util";

export const useLogin = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const login = async (data: LoginUserDto) => {
    try {
      setLoading(true);

      const res = await authService.login(data);

      // token
      localStorage.setItem("token", res.token);

      // (por si lo llego a usar)
      localStorage.setItem(
        "user",
        JSON.stringify({ id: res.id, email: res.email })
      );

      toast.success("Welcome back 👋");

      navigate("/home"); 

    } catch (error: any) {
      console.log(error);

      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
  localStorage.removeItem('token');
  navigate('/');
};

  return {
    login,
    loading,
    logout
  };
};
