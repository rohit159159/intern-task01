import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  LogOut, 
  Copy, 
  Share2, 
  DollarSign, 
  Users, 
  Gift, 
  Trophy,
  Star,
  Crown,
  Zap,
  Target,
  TrendingUp,
  Calendar,
  Activity,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ManualDonation from "@/components/ManualDonation";

interface UserData {
  name: string;
  email: string;
  referralCode: string;
  totalDonations: number;
  joinDate: string;
}

interface Reward {
  id: number;
  title: string;
  description: string;
  requirement: number;
  icon: React.ReactNode;
  unlocked: boolean;
  color: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Initialize rewards based on user's donations
      const rewardsList: Reward[] = [
        {
          id: 1,
          title: "Getting Started",
          description: "Welcome to the program!",
          requirement: 0,
          icon: <Star className="h-5 w-5" />,
          unlocked: true,
          color: "bg-yellow-500"
        },
        {
          id: 2,
          title: "First Milestone",
          description: "Reach $1,000 in donations",
          requirement: 1000,
          icon: <Target className="h-5 w-5" />,
          unlocked: parsedUser.totalDonations >= 1000,
          color: "bg-blue-500"
        },
        {
          id: 3,
          title: "Rising Star",
          description: "Reach $5,000 in donations",
          requirement: 5000,
          icon: <TrendingUp className="h-5 w-5" />,
          unlocked: parsedUser.totalDonations >= 5000,
          color: "bg-green-500"
        },
        {
          id: 4,
          title: "Super Achiever",
          description: "Reach $10,000 in donations",
          requirement: 10000,
          icon: <Zap className="h-5 w-5" />,
          unlocked: parsedUser.totalDonations >= 10000,
          color: "bg-purple-500"
        },
        {
          id: 5,
          title: "Champion",
          description: "Reach $25,000 in donations",
          requirement: 25000,
          icon: <Trophy className="h-5 w-5" />,
          unlocked: parsedUser.totalDonations >= 25000,
          color: "bg-orange-500"
        },
        {
          id: 6,
          title: "Legend",
          description: "Reach $50,000 in donations",
          requirement: 50000,
          icon: <Crown className="h-5 w-5" />,
          unlocked: parsedUser.totalDonations >= 50000,
          color: "bg-red-500"
        }
      ];
      
      setRewards(rewardsList);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate('/login');
  };

  const copyReferralCode = () => {
    if (user) {
      navigator.clipboard.writeText(user.referralCode);
      toast({
        title: "Copied!",
        description: "Referral code copied to clipboard.",
      });
    }
  };

  const shareReferralCode = () => {
    if (user) {
      const shareUrl = `${window.location.origin}/join?ref=${user.referralCode}`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Join our referral program!',
          text: `Use my referral code: ${user.referralCode}`,
          url: shareUrl,
        });
      } else {
        navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied!",
          description: "Referral link copied to clipboard.",
        });
      }
    }
  };

  const generateNewCode = () => {
    if (user) {
      const newCode = `${user.name.toLowerCase().replace(/\s+/g, '')}${Math.floor(Math.random() * 9999)}`;
      const updatedUser = { ...user, referralCode: newCode };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast({
        title: "New code generated!",
        description: "Your referral code has been updated.",
      });
    }
  };

  const handleDonationAdded = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, totalDonations: user.totalDonations + amount };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update rewards based on new total
      const rewardsList: Reward[] = [
        {
          id: 1,
          title: "Getting Started",
          description: "Welcome to the program!",
          requirement: 0,
          icon: <Star className="h-5 w-5" />,
          unlocked: true,
          color: "bg-yellow-500"
        },
        {
          id: 2,
          title: "First Milestone",
          description: "Reach $1,000 in donations",
          requirement: 1000,
          icon: <Target className="h-5 w-5" />,
          unlocked: updatedUser.totalDonations >= 1000,
          color: "bg-blue-500"
        },
        {
          id: 3,
          title: "Rising Star",
          description: "Reach $5,000 in donations",
          requirement: 5000,
          icon: <TrendingUp className="h-5 w-5" />,
          unlocked: updatedUser.totalDonations >= 5000,
          color: "bg-green-500"
        },
        {
          id: 4,
          title: "Super Achiever",
          description: "Reach $10,000 in donations",
          requirement: 10000,
          icon: <Zap className="h-5 w-5" />,
          unlocked: updatedUser.totalDonations >= 10000,
          color: "bg-purple-500"
        },
        {
          id: 5,
          title: "Champion",
          description: "Reach $25,000 in donations",
          requirement: 25000,
          icon: <Trophy className="h-5 w-5" />,
          unlocked: updatedUser.totalDonations >= 25000,
          color: "bg-orange-500"
        },
        {
          id: 6,
          title: "Legend",
          description: "Reach $50,000 in donations",
          requirement: 50000,
          icon: <Crown className="h-5 w-5" />,
          unlocked: updatedUser.totalDonations >= 50000,
          color: "bg-red-500"
        }
      ];
      
      setRewards(rewardsList);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const unlockedRewards = rewards.filter(reward => reward.unlocked);
  const nextReward = rewards.find(reward => !reward.unlocked);

  return (
    <div className="min-h-screen gradient-hero p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Professional Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4 animate-slide-up">
            <Avatar className="h-16 w-16 ring-4 ring-primary/30 shadow-glow">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-primary text-white font-bold text-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome back, {user.name}!</h1>
              <div className="flex items-center space-x-4 text-white/80 text-sm">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Activity className="h-4 w-4" />
                  <span>Active</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ManualDonation onDonationAdded={handleDonationAdded} />
            <Button onClick={handleLogout} variant="outline" className="hover-lift">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Professional Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-premium border-primary/ shadow-premium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Donations</CardTitle>
              <div className="p-2 rounded-full gradient-success">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">${user.totalDonations.toLocaleString()}</div>
              <p className="text-xs text-green-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-premium border-primary/shadow-premium" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Active Referrals</CardTitle>
              <div className="p-2 rounded-full gradient-primary">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{Math.floor(user.totalDonations / 500)}</div>
              <p className="text-xs text-blue-400">Based on donation activity</p>
            </CardContent>
          </Card>

          <Card className="glass-premium border-primary/shadow-premium" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Rewards Unlocked</CardTitle>
              <div className="p-2 rounded-full gradient-accent">
                <Gift className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{unlockedRewards.length}</div>
              <p className="text-xs text-purple-400">out of {rewards.length} total</p>
            </CardContent>
          </Card>

          <Card className="glass-premium border-primary/" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Monthly Goal</CardTitle>
              <div className="p-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500">
                <Target className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">85%</div>
              <p className="text-xs text-yellow-400">$4,250 of $5,000</p>
            </CardContent>
          </Card>
        </div>

        {/* Professional Referral Code Section */}
        <Card className="glass-premium border-primary/20 mb-8 animate-scale-in shadow-premium">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Share2 className="h-5 w-5 mr-2 text-primary" />
              Your Referral Code
            </CardTitle>
            <CardDescription className="text-white/80">
              Share this code to earn rewards when people join using your link. Every successful referral helps you unlock new milestones.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1 w-full">
                <div className="flex items-center space-x-2 p-4 rounded-lg glass-subtle border border-primary/30 hover:border-primary/50 transition-smooth">
                  <code className="text-xl font-mono text-white bg-primary/20 px-3 py-1 rounded">{user.referralCode}</code>
                  <div className="flex-1"></div>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    Active
                  </Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={copyReferralCode} variant="outline" size="sm" className="hover-lift">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={shareReferralCode} variant="gradient" size="sm" className="hover-lift">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Link
                </Button>
                <Button onClick={generateNewCode} variant="minimal" size="sm" className="hover-lift">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate New
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Rewards Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Unlocked Rewards */}
          <Card className="glass-premium border-primary/20 animate-slide-up shadow-premium">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center">
                <Trophy className="h-6 w-6 mr-3 text-yellow-400" />
                Achievement Gallery
              </CardTitle>
              <CardDescription className="text-white/80">
                Your unlocked rewards and milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {unlockedRewards.map((reward, index) => (
                  <div key={reward.id} className="flex items-center space-x-4 p-4 rounded-lg glass-subtle border border-white/10 hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className={`p-3 rounded-full ${reward.color} text-white shadow-glow`}>
                      {reward.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-lg">{reward.title}</h4>
                      <p className="text-sm text-white/70">{reward.description}</p>
                      <p className="text-xs text-primary font-medium mt-1">${reward.requirement.toLocaleString()} milestone</p>
                    </div>
                    <Badge variant="secondary" className="gradient-success border-0 shadow-card">
                      <Trophy className="h-3 w-3 mr-1" />
                      Unlocked
                    </Badge>
                  </div>
                ))}
                {unlockedRewards.length === 0 && (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">Start your journey to unlock rewards!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Next Milestone */}
          <Card className="glass-premium border-primary/20 animate-slide-up shadow-premium" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center">
                <Target className="h-6 w-6 mr-3 text-primary" />
                Next Milestone
              </CardTitle>
              <CardDescription className="text-white/80">
                Your progress towards the next achievement
              </CardDescription>
            </CardHeader>
            <CardContent>
              {nextReward ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 rounded-lg glass-subtle border border-primary/30 animate-pulse-glow">
                    <div className={`p-3 rounded-full ${nextReward.color} text-white shadow-glow-accent`}>
                      {nextReward.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-lg">{nextReward.title}</h4>
                      <p className="text-sm text-white/70">{nextReward.description}</p>
                      <p className="text-sm text-accent font-medium mt-1">${nextReward.requirement.toLocaleString()} target</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-white/80">
                      <span className="font-medium">Progress</span>
                      <span className="font-mono">${user.totalDonations.toLocaleString()} / ${nextReward.requirement.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <div 
                        className="gradient-primary h-3 rounded-full transition-all duration-1000 shadow-glow animate-pulse-glow"
                        style={{ width: `${Math.min((user.totalDonations / nextReward.requirement) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-primary font-medium">
                        {Math.round((user.totalDonations / nextReward.requirement) * 100)}% Complete
                      </span>
                      <span className="text-white/60">
                        ${(nextReward.requirement - user.totalDonations).toLocaleString()} to go
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 animate-scale-in">
                  <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6 animate-pulse-glow" />
                  <h3 className="text-2xl font-semibold text-white mb-3">Legendary Status Achieved!</h3>
                  <p className="text-white/70 mb-4">You've unlocked all available rewards. Congratulations on this incredible achievement!</p>
                  <Badge variant="secondary" className="text-lg px-4 py-2 gradient-primary border-0">
                    <Crown className="h-4 w-4 mr-2" />
                    Legend
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;