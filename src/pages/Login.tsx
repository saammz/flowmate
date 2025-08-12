
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { getFirebaseErrorMessage } from "@/lib/firebaseErrorUtils";
import { useLoginUserMutation } from "@/store/api/authApi";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();

  const [loginUser, { isLoading, error: signInError }] = useLoginUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
  
    if (!email.trim() || !password.trim()) {
      setLocalError("Please fill in all fields");
      return;
    }
  
    if (!email.includes('@')) {
      setLocalError("Please enter a valid email address");
      return;
    }
  
    console.log("Submitting login form:", { email: email.trim(), passwordLength: password.length });
  
    try {
      const result = await loginUser({
        email: email.trim(),
        password: password
      }).unwrap();
  
      console.log("Login successful:", result);
      toast.success("Login successful!");
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
  
      if (error.status === "FIREBASE_ERROR") {
        const firebaseError = getFirebaseErrorMessage({ code: error.data });
        setLocalError(firebaseError);
        toast.error(firebaseError);
      } else {
        const errorMessage = error.data || error.message || "Login failed. Please try again.";
        setLocalError(errorMessage);
        toast.error(errorMessage);
      }
    }
  };


  const getErrorMessage = () => {
    if (localError) return localError;

    if (signInError) {
      if (typeof signInError === 'string') {
        return signInError;
      } else if (signInError && typeof signInError === 'object' && 'data' in signInError) {
        return signInError.data as string;
      }
    }
    return null;
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your FlowMate account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator />
            <form onSubmit={handleSubmit} className="space-y-4">
              {getErrorMessage() && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {getErrorMessage()}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setLocalError("");
                  }}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLocalError("");
                  }}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot your password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;