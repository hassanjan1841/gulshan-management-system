

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { signInWithGoogle } from "../firebase/auth";
import { useNavigate } from "react-router";
import { useToast } from "../hooks/use-toast";  
import Cookies from "js-cookie"; 
import { useAuth } from "../context/authContext";
import { loginUser } from "../services/api/user";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCurrentUser } = useAuth();

  const handleGoogleLogin = async () => {
    setLoading(true);
    // Implement your Google login logic here
    try {
      const user = await signInWithGoogle();
      console.log("user in form", user);
      const userData = await loginUser(user.email);

      console.log("userData", userData.user);
      Cookies.set("token", userData.token);
      setCurrentUser(userData.user);

      toast({
        variant: "success",
        title: "Login Successful",
        description: "You have successfully signed in",
      });

      navigate(`/${userData.user.role}`);
    } catch (error) {
      setLoading(false);
      console.log("Error signing in:==> ", error.message);

      toast({
        variant: "destructive",
        title: error.message ? "Server Error" : "User Validaion",
        description: error?.response?.data?.message
          ? error.response.data.message
          : error?.message,
      });
    }
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
