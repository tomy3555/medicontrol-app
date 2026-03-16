import { useRegister } from "@/auth/hooks/useRegister";
import { Link } from "react-router-dom";
import {toast} from 'sonner';

export const RegisterPage = () => {

    const { email,
    password,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleRegister} = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* Card */}
      <div className="bg-white w-96 p-8 rounded-xl shadow-lg">

        {/* Título */}
        <h1 className="text-2xl font-semibold text-center mb-6">
          Crear cuenta
        </h1>

        {/* Form */}
        <div className="flex flex-col gap-4">

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@email.com"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Confirm password */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Botón */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md mt-2 transition"
          onClick={handleRegister}>
            Crear cuenta
          </button>

        </div>

        {/* Link login */}
        <p className="text-sm text-center mt-6 text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/"
            className="text-blue-500 hover:underline"
          >
            Iniciar sesión
          </Link>
        </p>

      </div>

    </div>
  );
};
