import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, LogIn } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");

  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(username, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        let errorMessage = "Registration failed";
        try {
          const data = await response.json();
          errorMessage = data.error || data.message || errorMessage;
          
          // Special handling for database unavailable
          if (data.hint) {
            errorMessage = `${errorMessage}\n\n${data.hint}`;
          }
        } catch (jsonError) {
          // If JSON parsing fails, use generic message
          errorMessage = `Registration failed (${response.status})`;
        }
        throw new Error(errorMessage);
      }

      setError("");
      alert(
        "Admin created successfully! Please login with your credentials."
      );
      setIsRegistering(false);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed. Please try again.";
      setError(errorMessage);
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = isRegistering ? handleRegister : handleLogin;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-card p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <LogIn className="w-6 h-6 text-primary" />
            <span className="text-2xl font-bold text-primary">Vezo CMS</span>
          </div>
          <CardTitle>
            {isRegistering ? "Create Admin Account" : "Admin Login"}
          </CardTitle>
          <CardDescription>
            {isRegistering
              ? "Set up your first admin account"
              : "Sign in to manage content"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
                minLength={3}
              />
            </div>

            {isRegistering && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading
                ? "Processing..."
                : isRegistering
                  ? "Create Account"
                  : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              {isRegistering
                ? "Already have an account?"
                : "First time here?"}
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError("");
                setUsername("");
                setEmail("");
                setPassword("");
              }}
            >
              {isRegistering ? "Go to Login" : "Create Admin Account"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
