import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginUser as loginUserThunk } from "../../components/Store/Auth-slice/index.js";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";

function Login() {
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleInput = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginUserThunk(data)).unwrap();
      if (response?.success) {
        const role = response?.user?.role;
        toast.success(response?.message || "Logged in successfully");
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      } else {
        toast.error(response?.message || "Login failed");
      }
    } catch (err) {
      toast.error(err?.message || "Login failed");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold text-center">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={data.email}
              required
              onChange={HandleInput}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={data.password}
              placeholder="Enter your password"
              required
              onChange={HandleInput}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
          <Button
            variant="outline"
            className="w-full font-bold text-medium"
            size="lg"
            onClick={() =>
              window.open("http://localhost:5000/api/auth/google", "_self")
            }
          >
            <img
              src="/icons8-google-48.png"
              alt="Google"
              className="mr-2 h-5 w-5"
            />
            Login with Google
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/auth/register"
              className="font-medium text-primary hover:underline"
            >
              Register now
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default Login;
