import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Gift, Zap, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 gradient-primary opacity-20"></div>
      
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div>
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 mb-6">
              <TrendingUp className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Referral Rise Hub
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join our community and make a difference. Track your donations, unlock rewards, and inspire others through our referral program.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup">
              <Button variant="gradient" size="lg" className="text-lg px-8 py-4 w-full sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4 w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="glass-card border-white/20 hover:scale-105 transition-smooth">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-blue-500 w-fit">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Community Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/80">
                  Join a community of passionate individuals making a real impact through collective action.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20 hover:scale-105 transition-smooth" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-purple-500 w-fit">
                  <Gift className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Earn Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/80">
                  Unlock exclusive rewards and recognition as you reach donation milestones and refer others.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20 hover:scale-105 transition-smooth" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-green-500 w-fit">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/80">
                  Monitor your donation progress and see the real-time impact of your contributions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-white/80">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">$2.5M+</div>
              <div className="text-white/80">Donations Raised</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80">Rewards Unlocked</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
