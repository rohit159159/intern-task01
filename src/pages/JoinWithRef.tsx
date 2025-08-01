import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Gift, Zap, Star } from "lucide-react";

const JoinWithRef = () => {
  const [searchParams] = useSearchParams();
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    const ref = searchParams.get('ref');
    setReferralCode(ref);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="absolute inset-0 gradient-primary opacity-20"></div>
      
      <Card className="w-full max-w-2xl glass-card border-white/20 animate-float">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 w-fit">
            <Gift className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-white mb-2">
            You've Been Invited!
          </CardTitle>
          {referralCode && (
            <CardDescription className="text-white/80 text-lg">
              Join using referral code: <Badge variant="secondary" className="ml-2 text-lg px-3 py-1">{referralCode}</Badge>
            </CardDescription>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center text-white/90">
            <p className="text-lg mb-4">
              Someone special thinks you'd be perfect for our referral program!
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-white/10">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Join Community</h3>
              <p className="text-sm text-white/70">Connect with like-minded individuals</p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-white/10">
              <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Earn Rewards</h3>
              <p className="text-sm text-white/70">Unlock amazing benefits and prizes</p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-white/10">
              <Star className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Make Impact</h3>
              <p className="text-sm text-white/70">Contribute to meaningful causes</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4 pt-4">
            <Link to="/signup" className="block">
              <Button 
                className="w-full text-lg py-6" 
                variant="gradient"
              >
                Join Now & Get Started
              </Button>
            </Link>
            
            <div className="text-center">
              <p className="text-white/80 mb-2">Already have an account?</p>
              <Link to="/login">
                <Button variant="outline" className="text-white border-white/20">
                  Sign In Instead
                </Button>
              </Link>
            </div>
          </div>

          {/* Features List */}
          <div className="pt-6 border-t border-white/20">
            <h4 className="text-white font-semibold mb-3">What you'll get:</h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                Personal referral dashboard
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                Track your donation progress
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                Unlock exclusive rewards
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                Share your own referral code
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinWithRef;