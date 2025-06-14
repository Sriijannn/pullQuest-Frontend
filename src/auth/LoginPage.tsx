"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Loader2, Github, ArrowRight, Coins, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/UseLogin";
import { useUser } from "@/context/UserProvider";
import { useEffect } from "react";

type LoginCase = "initial" | "github_oauth" | "success";

export default function LoginPage() {
  const [currentCase, setCurrentCase] = useState<LoginCase>("initial");
  const [role, setRole] = useState<"contributor" | "maintainer" | "company" | "">("");
  const [githubUsername, setGithubUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { login, isLoading, error } = useLogin();

  // Handle initial login (Case 1)
  const handleInitialLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await login({
      role: role || undefined,
      email,
      password,
      githubUsername: (role === "contributor" || role === "maintainer") ? githubUsername : undefined,
    });

    if (result.success) {
      // User verified, move to GitHub OAuth case
      setIsVerified(true);
      setCurrentCase("github_oauth");
    }
    // Error handling is done by the hook
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get("user");
    if (userParam) {
      try {
        // It may be URI-encoded—decode first
        const decoded = decodeURIComponent(userParam);
        const user = JSON.parse(decoded);
        console.log("User found from OAuth:", user); // ← add this!
        setUser(user);
        window.history.replaceState({}, document.title, window.location.pathname);
        if (user.role) {
          navigate(`/${user.role}/dashboard`);
        }
      } catch (e) {
        console.error("Failed to parse user from OAuth:", e);
      }
    }
  }, [setUser, navigate]);
  

  // Render Case 1: Initial Login
  const renderInitialLogin = () => (
    <Card className="border shadow-lg">
      <CardContent className="p-8">
        <form onSubmit={handleInitialLogin} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Role Selection */}
          <div>
            <Label>Who are you?</Label>
            <Select
              value={role}
              onValueChange={(value: string) =>
                setRole(value as "contributor" | "maintainer" | "company" | "")
              }
              disabled={isLoading}
              required
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contributor">Contributor</SelectItem>
                <SelectItem value="maintainer">Maintainer</SelectItem>
                <SelectItem value="company">Company</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* GitHub Username - Only for contributors and maintainers */}
          {(role === "contributor" || role === "maintainer") && (
            <div>
              <Label>GitHub Username</Label>
              <Input
                type="text"
                placeholder="octocat"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {/* Password */}
          <div>
            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className="pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword((v) => !v)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gray-900 text-white"
            disabled={
              isLoading ||
              !role ||
              !email ||
              !password ||
              ((role === "contributor" || role === "maintainer") && !githubUsername)
            }
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Verify Identity"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4 inline-block" />}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-medium text-gray-900 underline"
            onClick={() => navigate("/signUp")}
          >
            Sign up for free
          </button>
        </p>
      </CardContent>
    </Card>
  );

  // Render Case 2: GitHub OAuth
  const renderGithubOAuth = () => (
    <Card className="border shadow-lg">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          {/* Success indicator */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Identity Verified!</h3>
            <p className="text-gray-600 mb-6">
              Now let's connect your GitHub account to complete the sign-in process.
            </p>
          </div>

          {/* User Info Summary */}
          <div className="bg-gray-50 p-4 rounded-lg text-left">
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Role:</span> {role}
              </div>
              <div>
                <span className="font-medium">Email:</span> {email}
              </div>
              {githubUsername && (
                <div>
                  <span className="font-medium">GitHub:</span> {githubUsername}
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={() => {
              // Store the role, email, githubUsername for after OAuth
              localStorage.setItem(
                "preOAuthUser",
                JSON.stringify({ role, email, githubUsername })
              );
              window.location.href = "http://localhost:8012/auth/github";
            }}
            className="w-full h-12 bg-gray-900 text-white"
            disabled={isLoading}
          >
            <Github className="mr-2" />
            Continue with GitHub
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            onClick={() => setCurrentCase("initial")}
            className="w-full h-12"
            disabled={isLoading}
          >
            Back to Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <span className="text-xl font-semibold text-gray-900">
              Pull Quest
            </span>
            {/* Progress indicator */}
            <div className="flex items-center space-x-2">
              <div className={`h-2 w-8 rounded-full ${currentCase === "initial" ? "bg-gray-900" : "bg-gray-300"}`} />
              <div className={`h-2 w-8 rounded-full ${currentCase === "github_oauth" ? "bg-gray-900" : "bg-gray-300"}`} />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Coins className="mx-auto mb-6 h-16 w-16 rounded-full bg-gray-900 p-4 text-white" />
            <h1 className="text-4xl font-bold mb-4">
              {currentCase === "initial" ? "Welcome back" : "Almost there!"}
            </h1>
            {currentCase === "github_oauth" && (
              <p className="text-gray-600">
                Complete your sign-in with GitHub
              </p>
            )}
          </div>

          {currentCase === "initial" && renderInitialLogin()}
          {currentCase === "github_oauth" && renderGithubOAuth()}
        </div>
      </div>
    </div>
  );
  );
}