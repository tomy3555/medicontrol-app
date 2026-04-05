import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "@/auth/hooks/useRegister";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

export const RegisterPage = () => {
  const { register, loading } = useRegister();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    register({
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); 
        handleSubmit();
      }}
      className="min-h-screen flex items-center justify-center bg-background"
    >
      <Card className="w-full max-w-md shadow-card">
        
        <CardHeader>
          <CardTitle className="text-center text-2xl text-primary">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          
          {/* Full Name */}
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>

          {/* Button */}
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>

          {/* Link */}
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-primary hover:underline"
            >
              Login
            </Link>
          </p>

        </CardContent>
      </Card>
    </form>
  );
};
