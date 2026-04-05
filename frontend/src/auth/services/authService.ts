
import type { LoginUserDto } from "../types/interfaces/login-user.interface";
import type { AuthResponse } from "../types/responses/auth.response";
import type { RegisterUserDto } from "../types/interfaces/register-user.interface";
import { api } from "@/app/axios";




export const authService = {
  login: async (data: LoginUserDto) => {
    const res = await api.post<AuthResponse>(`/auth/login`, data);
    return res.data;
  },

  register: async (data: RegisterUserDto) => {
    const res = await api.post<AuthResponse>(`/auth/register`, data);
    return res.data;
  },
};