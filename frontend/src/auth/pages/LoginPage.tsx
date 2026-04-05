import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    login(formData);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="min-h-screen flex items-center justify-center bg-background"
    >
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-card space-y-6 border">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-primary">
            MediControl
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your health easily
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-foreground">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              placeholder="Enter your email"
              className="w-full border border-input rounded-md px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-foreground">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              placeholder="Enter your password"
              className="w-full border border-input rounded-md px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:opacity-90 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* Link */}
        <p
          onClick={() => navigate("/register")}
          className="text-center text-sm text-primary cursor-pointer hover:underline"
        >
          Create account
        </p>
      </div>
    </form>
  );
};
