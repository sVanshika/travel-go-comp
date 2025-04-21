"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(null);
    setEmailError(null);
    setPasswordError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Password and Confirm Password do not match.");
      setTimeout(() => {
        setPasswordError("");
      }, 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError("Invalid email address.");
      setTimeout(() => {
        setEmailError("");
      }, 3000);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        router.push("/login?signup=success"); // Redirect with success message query parameter
      } else {
        const resError = await response.json();

        if (resError.detail === "EMAIL_EXISTS") {
          setError(
            "An account with this email already exists. Try logging in."
          );
        } else if (resError.detail === "INVALID_EMAIL") {
          setError("The email format is invalid. Please check and try again.");
        } else if (resError.detail === "WEAK_PASSWORD") {
          setError("Password is too weak. It must be at least 6 characters.");
        } else {
          setError("Signup failed. Please try again.");
        }
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Signup failed. Server error.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="text-2xl font-bold">TravelGo</span>
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Sign up to start planning your next adventure
          </CardDescription>
        </CardHeader>
        <CardContent>
          {(error || emailError || passwordError) && (
            <div className="mb-4 rounded-lg bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-sm">
              {error && <p>{error}</p>}
              {emailError && <p>{emailError}</p>}
              {passwordError && <p>{passwordError}</p>}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div
                  className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <div
                  className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
