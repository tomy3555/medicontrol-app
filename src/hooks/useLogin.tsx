import { useState } from "react"






export const useLogin = () => {

    //manejo de email
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.target.value es el texto que el usuario acaba de escribir
    setEmail(event.target.value);
    };


    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };


     // Esta función se ejecutará cuando el usuario presione el botón "Login"
    const handleLogin = () => {

    if (!email || !password) {
      alert("Debes completar email y contraseña");
      return;
    }
    }

  return {
    password,
    email,


    handleEmailChange,
    handlePasswordChange,
    handleLogin
  }

}
