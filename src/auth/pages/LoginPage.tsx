import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

import {toast} from 'sonner';



export const LoginPage = () => {

  const navigate = useNavigate();

  const{ email, password, handleEmailChange, handlePasswordChange, handleLogin, loading } = useLogin();

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100"> {/* color de fondo y layout */}
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-6">
        
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-blue-600">MediControl</h1>
          <p className="text-gray-500 text-sm mt-1">
            Maneja tu salud
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              placeholder="Ingresar email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleEmailChange}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              placeholder="Ingresar contraseña"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handlePasswordChange}
            />
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        onClick={handleLogin}
        disabled={loading}>
          Iniciar Sesion
        </button>

        <p onClick={()=> navigate("/register")} className="text-center text-sm text-blue-600 cursor-pointer hover:underline">
          Crear Cuenta
        </p>
      </div>
    </div>
  )
}
