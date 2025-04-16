"use client";
import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { signInSchema } from "@/schemas/signInSchema";
import { toast } from "sonner";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    const remember = e.target.remember.checked;
    const validation = signInSchema.safeParse({ email, password });

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Keep this false so you can handle it manually
    });

    setIsLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Sign in successful!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-purple-500" />
        <span className="text-xl font-bold text-white">Whisperly</span>
      </Link>

      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 text-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign in
          </CardTitle>
          <CardDescription className="text-zinc-400 text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="border-zinc-700 bg-zinc-800  text-white placeholder:text-zinc-500 focus-visible:ring-purple-500"
              />
            </div>
            <div className="flex items-center mb-4 space-x-2">
              <Checkbox
                id="remember"
                className="border-zinc-700 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label htmlFor="remember" className="text-sm font-normal">
                Remember me
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <div className="text-center text-sm text-zinc-400">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="text-purple-400 hover:text-purple-300"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
