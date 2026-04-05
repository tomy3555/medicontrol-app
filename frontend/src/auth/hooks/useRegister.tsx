import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { RegisterUserDto } from "../types/interfaces/register-user.interface";
import { authService } from "../services/authService";
import { handleApiError } from "../utils/handleApiError.util";

export const useRegister = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const register = async (data: RegisterUserDto) => {
    try {
      setLoading(true);

      const res = await authService.register(data);

      // guardar token después del registro
      localStorage.setItem("token", res.token);

      localStorage.setItem(
        "user",
        JSON.stringify({ id: res.id, email: res.email })
      );

      toast.success("Account created 🎉");

      navigate("/home");

    } catch (error: any) {
      console.log(error);

      toast.error(handleApiError(error))  
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
  };
};
