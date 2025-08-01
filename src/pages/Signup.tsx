import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, User, Lock, Mail, ArrowRight, Shield, Award, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        name: formData.name,
        email: formData.email,
        referralCode: `${formData.name.toLowerCase().replace(/\s+/g, '')}2025`,
        totalDonations: 0,
        joinDate: new Date().toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      
      toast({
        title: "Account created!",
        description: "Welcome to the referral program.",
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
        {/* Left side - Benefits */}
        <div className="hidden lg:block space-y-6 animate-slide-up">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white">
              Join{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ReferralPro
              </span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Start your journey with the most advanced referral tracking platform. 
              Unlock rewards, track donations, and grow your network.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 glass-subtle p-4 rounded-lg hover-lift">
              <Shield className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white">Secure & Reliable</h3>
                <p className="text-sm text-white/70">Enterprise-grade security for your data</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 glass-subtle p-4 rounded-lg hover-lift">
              <Award className="h-6 w-6 text-accent flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white">Reward System</h3>
                <p className="text-sm text-white/70">Unlock exclusive rewards as you grow</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 glass-subtle p-4 rounded-lg hover-lift">
              <TrendingUp className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white">Advanced Analytics</h3>
                <p className="text-sm text-white/70">Track performance with detailed insights</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Signup Form */}
        <Card className="w-full max-w-md mx-auto glass-premium border-primary/20 animate-scale-in shadow-premium">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-white">Create Account</CardTitle>
            <CardDescription className="text-white/80 text-base">
              Start your referral journey today
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 glass-subtle border-white/30 text-white placeholder:text-white/60 h-12 focus:border-primary/50 focus:glass-card transition-smooth"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
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
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white font-medium">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 glass-subtle border-white/30 text-white placeholder:text-white/60 h-12 focus:border-primary/50 focus:glass-card transition-smooth"
                    required
                  />
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
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
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
                <span className="bg-card px-2 text-white/60">Already have an account?</span>
              </div>
            </div>

            <div className="text-center">
              <Link 
                to="/login" 
                className="group inline-flex items-center text-primary hover:text-primary/80 font-medium transition-smooth"
              >
                Sign in instead
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;