import { useState } from "react";
import { registerRequest } from "../services/authService";

export const useRegister = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {

    if (!email || !password || !confirmPassword) {
      alert("Completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {

      setLoading(true);

      const data = await registerRequest({
        email,
        password
      });

      console.log("Usuario creado:", data);

    } catch (error) {

      console.error("Error en registro:", error);

    } finally {

      setLoading(false);

    }

  };

  return {
    email,
    password,
    confirmPassword,
    loading,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleRegister
  };
};