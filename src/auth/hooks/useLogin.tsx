import { useState } from "react";
import { loginRequest } from "../services/authService";
import { saveToken } from "../tokenStorage";

export const useLogin = () => {

  
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  
  const handleLogin = async () => {

  
    if (!email || !password) {
      alert("Debes completar email y contraseña");
      return;
    }

    try { 
      setLoading(true);

      // llamada a la API
      const data = await loginRequest(email, password);
      saveToken(data.token);

      console.log("Login correcto:", data);

      
      //! navigate("/home")

    } catch (error) {

      console.error("Error en login:", error);
      alert("Credenciales incorrectas");

    } finally {
      setLoading(false);
    }
  };

  return {
    password,
    email,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    loading
  };
};
