"use client";
import { useState, useRef, useEffect } from "react";
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
import {
  MessageSquare,
  ArrowLeft,
  Mail,
  KeyRound,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

export default function ForgotPasswordPage() {
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(20);

  // Form data
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);

  // Refs
  const inputRefs = useRef([]);

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setError(null);
    setIsLoading(true);

    // Simulate API call to check if email exists
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, we'll assume all emails exist
      // In a real app, this would check against your database

      setCurrentStep(2);
      setProgress(40);
      startResendCountdown();
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    // Take only the last character if multiple are pasted
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input if value is entered
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);

      // Focus the last input
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus();
      }
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    // Check if OTP is complete
    if (otp.some((digit) => digit === "")) {
      setError("Please enter the complete verification code");
      return;
    }

    setError(null);
    setIsLoading(true);

    // Simulate API call to verify OTP
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, we'll assume all OTPs are valid
      // In a real app, this would verify against your database

      setCurrentStep(3);
      setProgress(70);
    } catch (err) {
      setError("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password reset
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(null);
    setIsLoading(true);

    // Simulate API call to reset password
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, we'll assume password reset is always successful
      // In a real app, this would update the password in your database

      setCurrentStep(4);
      setProgress(100);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password strength calculation
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

  // Handle resend countdown
  const startResendCountdown = () => {
    setResendDisabled(true);
    setCountdown(30);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendCode = async () => {
    setResendDisabled(true);

    // Simulate API call to resend OTP
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      startResendCountdown();
    } catch (err) {
      setError("Failed to resend code. Please try again.");
      setResendDisabled(false);
    }
  };

  // Get strength color for password meter
  const getStrengthColor = () => {
    if (passwordStrength < 40) return "bg-red-500";
    if (passwordStrength < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Get strength text for password meter
  const getStrengthText = () => {
    if (passwordStrength < 40) return "Weak";
    if (passwordStrength < 80) return "Good";
    return "Strong";
  };

  // Focus first OTP input when step 2 is reached
  useEffect(() => {
    if (currentStep === 2 && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0].focus();
      }, 100);
    }
  }, [currentStep]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-purple-500" />
        <span className="text-xl font-bold text-white">Whisperly</span>
      </Link>

      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 text-white">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            {currentStep < 4 && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800"
                onClick={() => {
                  if (currentStep > 1) {
                    setCurrentStep(currentStep - 1);
                    setProgress(progress - 30);
                    setError(null);
                  }
                }}
                disabled={isLoading}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Go back</span>
              </Button>
            )}
            <div className="flex-1 text-center">
              <CardTitle className="text-2xl font-bold">
                {currentStep === 1 && "Reset Password"}
                {currentStep === 2 && "Verify Your Email"}
                {currentStep === 3 && "Create New Password"}
                {currentStep === 4 && "Password Reset Complete"}
              </CardTitle>
            </div>
            {currentStep < 4 && <div className="w-8" />}
          </div>
          <CardDescription className="text-zinc-400 text-center">
            {currentStep === 1 &&
              "Enter your email to receive a verification code"}
            {currentStep === 2 && "Enter the 6-digit code sent to your email"}
            {currentStep === 3 &&
              "Create a new secure password for your account"}
            {currentStep === 4 && "Your password has been successfully reset"}
          </CardDescription>

          {currentStep < 4 && (
            <Progress
              value={progress}
              className="h-1 mt-2 bg-zinc-800"
              indicatorClassName={
                progress === 100 ? "bg-green-500" : "bg-purple-600"
              }
            />
          )}
        </CardHeader>

        <CardContent>
          {error && (
            <Alert className="mb-4 bg-red-900/20 border-red-900 text-red-400">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Step 1: Email Input */}
          {currentStep === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500"
                    disabled={isLoading}
                    autoComplete="email"
                    required
                  />
                </div>
                <p className="text-xs text-zinc-400">
                  We'll send a verification code to this email address
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending Code...
                  </span>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {currentStep === 2 && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp-1">Verification Code</Label>
                <div className="flex justify-center space-x-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handleOtpPaste : undefined}
                      className="h-12 w-12 text-center text-lg border-zinc-700 bg-zinc-800 text-white focus-visible:ring-purple-500"
                      disabled={isLoading}
                    />
                  ))}
                </div>
                <div className="text-center text-sm text-zinc-400">
                  We sent a code to{" "}
                  <span className="text-zinc-300">{email}</span>
                </div>
                <div className="text-center text-sm">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={resendDisabled || isLoading}
                    className={`text-purple-400 hover:text-purple-300 ${
                      resendDisabled || isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {resendDisabled
                      ? `Resend code in ${countdown}s`
                      : "Resend code"}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-600"
                disabled={isLoading || otp.some((digit) => digit === "")}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Verify Code"
                )}
              </Button>
            </form>
          )}

          {/* Step 3: New Password */}
          {currentStep === 3 && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="pl-10 pr-10 border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

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
                      indicatorClassName={getStrengthColor()}
                    />
                    <ul className="text-xs text-zinc-400 space-y-1 mt-2">
                      <li
                        className={password.length >= 8 ? "text-green-500" : ""}
                      >
                        • At least 8 characters
                      </li>
                      <li
                        className={
                          /[A-Z]/.test(password) ? "text-green-500" : ""
                        }
                      >
                        • At least one uppercase letter
                      </li>
                      <li
                        className={
                          /[0-9]/.test(password) ? "text-green-500" : ""
                        }
                      >
                        • At least one number
                      </li>
                      <li
                        className={
                          /[^A-Za-z0-9]/.test(password) ? "text-green-500" : ""
                        }
                      >
                        • At least one special character
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500"
                    disabled={isLoading}
                    required
                  />
                </div>
                {password && confirmPassword && (
                  <div className="flex items-center gap-1 text-xs">
                    {password === confirmPassword ? (
                      <>
                        <Check className="h-3 w-3 text-green-500" />
                        <span className="text-green-500">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3 text-red-500" />
                        <span className="text-red-500">
                          Passwords do not match
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-600"
                disabled={
                  isLoading ||
                  password.length < 8 ||
                  password !== confirmPassword
                }
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Resetting Password...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          )}

          {/* Step 4: Success */}
          {currentStep === 4 && (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <div className="h-16 w-16 rounded-full bg-green-900/30 flex items-center justify-center mb-2">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-center text-zinc-300">
                Your password has been successfully reset. You can now log in
                with your new password.
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          {currentStep === 4 && (
            <Button
              asChild
              className="w-full bg-purple-700 hover:bg-purple-600"
            >
              <Link href="/sign-in">Go to Login</Link>
            </Button>
          )}

          <div className="text-center text-sm text-zinc-500">
            {currentStep < 4 ? (
              <>
                Remember your password?{" "}
                <Link
                  href="/sign-in"
                  className="text-purple-400 hover:text-purple-300"
                >
                  Back to login
                </Link>
              </>
            ) : (
              <>
                Need help?{" "}
                <Link
                  href="#"
                  className="text-purple-400 hover:text-purple-300"
                >
                  Contact support
                </Link>
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
