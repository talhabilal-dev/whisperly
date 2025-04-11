"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/debounce";
import { toast } from "sonner";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkUsername = async (username) => {
    setIsCheckingUsername(true);
    try {
      const res = await fetch(`/api/auth/check-username?username=${username}`);
      const data = await res.json();
      if (data.success) {
        setUsernameMessage("Username available");
      } else {
        setUsernameMessage(data.message);
      }
    } catch (error) {
      setUsernameMessage("Error checking username");
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const debouncedUsername = useDebounce(username, 500);

  useEffect(() => {
    if (debouncedUsername) {
      checkUsername(debouncedUsername);
    } else {
      setUsernameMessage("");
    }
  }, [debouncedUsername]);
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Simple password strength calculation
    let strength = 0;
    if (newPassword.length > 0) strength += 20;
    if (newPassword.length > 7) strength += 20;
    if (/[A-Z]/.test(newPassword)) strength += 20;
    if (/[0-9]/.test(newPassword)) strength += 20;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength += 20;

    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    if (passwordStrength < 40) return "bg-red-500";
    if (passwordStrength < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength < 40) return "Weak";
    if (passwordStrength < 80) return "Good";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;
    const fullName = e.target.fullName.value;
    const username = e.target.username.value;

    const confirmPassword = e.target.confirmPassword.value;
    if (password !== confirmPassword) {
      setIsLoading(false);
      toast.error("Passwords do not match", {
        description: "Please make sure your passwords match.",
        // variant: "destructive",
      });
      return;
    }

    // Simulate API call

    // In a real application, you would send the data to your backend here

    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, fullName, username }), // Replace with your data
    });

    if (!response.ok) {
      setIsLoading(false);
      toast.error("Error creating account", {
        description: "Please try again later.",
        // variant: "destructive",
      });
    }

    const data = await response.json();
    if (!data.success) {
      setIsLoading(false);
      toast.error("Error creating account", {
        description: data.message,
        // variant: "destructive",
      });

      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      // Redirect to OTP verification would happen here
      window.location.href = "/verify-otp";
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-950 p-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-purple-500" />
        <span className="text-xl font-bold text-white">Whisperly</span>
      </Link>

      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 text-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-zinc-400 text-center">
            Enter your details to create your Whisperly account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John"
                  required
                  className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="johndoe"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500"
                />
                {isCheckingUsername && <Loader2 className="animate-spin" />}
                {!isCheckingUsername && usernameMessage && (
                  <p
                    className={`text-sm ${
                      usernameMessage == "Username available"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {usernameMessage}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500"
              />
              {password && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Password strength:</span>
                    <span
                      className={
                        passwordStrength < 40
                          ? "text-red-500"
                          : passwordStrength < 80
                          ? "text-yellow-500"
                          : "text-green-500"
                      }
                    >
                      {getStrengthText()}
                    </span>
                  </div>
                  <Progress
                    value={passwordStrength}
                    className="h-1 bg-zinc-700"
                    indicatorclassname={getStrengthColor()}
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-purple-700 mt-4 hover:bg-purple-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
            <div className="text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-purple-400 hover:text-purple-300"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
