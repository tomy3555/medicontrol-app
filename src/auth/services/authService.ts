import { api } from "@/app/axios";
import type { AuthResponse } from "../interfaces/auth.response";
import type { RegisterRequest } from "../interfaces/register.request";



export const loginRequest = async (
  email: string,
  password: string
): Promise<AuthResponse> => {

  const response = await api.post<AuthResponse>("/login", {
    email,
    password
  });

  return response.data;
};


export const registerRequest = async (data: RegisterRequest) => {

  const response = await api.post("/register", data);

  return response.data;
};