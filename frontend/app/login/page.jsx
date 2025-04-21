"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
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

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.get("signup") === "success") {
      setSuccessMessage("Account created successfully! Please log in.");

      // Remove the 'signup' query param from URL
      queryParams.delete("signup");
      const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
      window.history.replaceState({}, "", newUrl);

      // Hide the message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Invalid email format");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      console.log("login response")
      console.log(response)
      console.log(response.id_token)
      
      if (response.ok) {
        const data = await response.json();
        console.log("response data - " + data)
        console.log(data)
        const user_id = data.local_id || data.localId
        if (user_id) {
          localStorage.setItem("user_id", user_id);  
        }
       
        router.push("/dashboard");
      } else {
        setError("Invalid login credentials");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
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
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <div className="mb-4 text-sm text-green-600 bg-green-100 px-4 py-2 rounded">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-2 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
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
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
