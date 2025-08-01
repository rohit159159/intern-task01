import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock login - any email/password works
      const userData = {
        name: email.split('@')[0] || "John Doe",
        email: email,
        referralCode: `${email.split('@')[0] || "john"}2025`,
        totalDonations: Math.floor(Math.random() * 50000) + 10000,
        joinDate: new Date().toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
        variant: "default",
      });
      
      navigate('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-hero">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:block space-y-6 animate-slide-up">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white">
              Welcome Back to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ReferralPro
              </span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Track your referrals, manage donations, and unlock exclusive rewards. 
              Your professional dashboard awaits.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-subtle p-4 rounded-lg hover-lift">
              <Sparkles className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold text-white">Real-time Analytics</h3>
              <p className="text-sm text-white/70">Track your progress instantly</p>
            </div>
            <div className="glass-subtle p-4 rounded-lg hover-lift">
              <ArrowRight className="h-8 w-8 text-accent mb-2" />
              <h3 className="font-semibold text-white">Smart Referrals</h3>
              <p className="text-sm text-white/70">Automated tracking system</p>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <Card className="w-full max-w-md mx-auto glass-premium border-primary/20 animate-scale-in shadow-premium">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-white">Sign In</CardTitle>
            <CardDescription className="text-white/80 text-base">
              Access your professional dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 glass-subtle border-white/30 text-white placeholder:text-white/60 h-12 focus:border-primary/50 focus:glass-card transition-smooth"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-12 glass-subtle border-white/30 text-white placeholder:text-white/60 h-12 focus:border-primary/50 focus:glass-card transition-smooth"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-white/60 hover:text-white transition-fast"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg"
                className="w-full" 
                variant="gradient"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-white/60">New to ReferralPro?</span>
              </div>
            </div>

            <div className="text-center">
              <Link 
                to="/signup" 
                className="group inline-flex items-center text-primary hover:text-primary/80 font-medium transition-smooth"
              >
                Create your account
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;