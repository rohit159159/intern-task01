import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DollarSign, Plus, CreditCard, Building, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ManualDonationProps {
  onDonationAdded: (amount: number) => void;
}

const ManualDonation = ({ onDonationAdded }: ManualDonationProps) => {
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const donationAmount = parseFloat(amount);
    if (!donationAmount || donationAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      onDonationAdded(donationAmount);
      
      toast({
        title: "Donation Recorded!",
        description: `$${donationAmount.toLocaleString()} donation from ${donorName || 'Anonymous'} has been added.`,
        variant: "default",
      });
      
      // Reset form
      setAmount("");
      setDonorName("");
      setPaymentMethod("credit-card");
      setIsLoading(false);
      setIsOpen(false);
    }, 1000);
  };

  const quickAmounts = [25, 50, 100, 250, 500, 1000];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient-accent" size="lg" className="animate-pulse-glow-accent">
          <Plus className="h-5 w-5 mr-2" />
          Add Donation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] glass-premium border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-primary" />
            Record Donation
          </DialogTitle>
          <DialogDescription className="text-white/80">
            Add a donation that was received through other channels
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Amount Selection */}
          <div className="space-y-3">
            <Label className="text-white">Quick Amount Selection</Label>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  type="button"
                  variant={amount === quickAmount.toString() ? "gradient" : "outline"}
                  size="sm"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="transition-bounce"
                >
                  ${quickAmount}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-white">Custom Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-white/60" />
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 glass-card border-white/20 text-white placeholder:text-white/60"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Donor Name */}
          <div className="space-y-2">
            <Label htmlFor="donorName" className="text-white">Donor Name (Optional)</Label>
            <Input
              id="donorName"
              type="text"
              placeholder="Enter donor name"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="glass-card border-white/20 text-white placeholder:text-white/60"
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <Label className="text-white">Payment Method</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={paymentMethod === "credit-card" ? "gradient" : "outline"}
                size="sm"
                onClick={() => setPaymentMethod("credit-card")}
                className="flex flex-col items-center p-3 h-auto"
              >
                <CreditCard className="h-4 w-4 mb-1" />
                <span className="text-xs">Card</span>
              </Button>
              <Button
                type="button"
                variant={paymentMethod === "bank" ? "gradient" : "outline"}
                size="sm"
                onClick={() => setPaymentMethod("bank")}
                className="flex flex-col items-center p-3 h-auto"
              >
                <Building className="h-4 w-4 mb-1" />
                <span className="text-xs">Bank</span>
              </Button>
              <Button
                type="button"
                variant={paymentMethod === "mobile" ? "gradient" : "outline"}
                size="sm"
                onClick={() => setPaymentMethod("mobile")}
                className="flex flex-col items-center p-3 h-auto"
              >
                <Smartphone className="h-4 w-4 mb-1" />
                <span className="text-xs">Mobile</span>
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Recording..." : "Record Donation"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ManualDonation;