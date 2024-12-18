"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { signInWithGoogle } from "../firebase/auth";
import { useNavigate } from "react-router";
import { getUserByEmail } from "../services/api/user";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navgiate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    // Implement your Google login logic here
    try {
      const user = await signInWithGoogle();

      const userData = await getUserByEmail(user.email);

      if (!userData[0]) {
        console.error("User not found");
        return;
      }
      // console.log(userData);

      navgiate(`/${userData[0].role}`);
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
    // setTimeout(() => setLoading(false), 2000); // Simulating API call
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <Card className="w-full max-w-md bg-secondary backdrop-blur-sm">
        <CardContent className="flex flex-col items-center space-y-6 p-8">
          <div className="rounded-full bg-primary/10 p-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <span className="text-3xl font-bold text-primary-foreground">
                L
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
          <p className="text-muted-foreground text-center">
            Sign in to your account to continue
          </p>
          <Button
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Continue with Google"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
