import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "sonner";
import { RegisterUser as registerUserThunk } from "../../components/Store/Auth-slice/index.js";
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
import { UserPlus } from "lucide-react";

function Register() {
  const [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleInput = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(registerUserThunk(data));
      toast.success("Registered successfully. Please login.");
      navigate("/auth/login");
    } catch (err) {
      toast.error(err?.message || "Registration failed");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold text-center">
          Create Account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your details to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="Enter your name"
              name="username"
              value={data.username}
              required
              onChange={HandleInput}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
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
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
              value={data.password}
              required
              onChange={HandleInput}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            <UserPlus className="mr-2 h-4 w-4" />
            Create Account
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
            Register with Google
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-medium text-primary hover:underline"
            >
              Login now
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default Register;
