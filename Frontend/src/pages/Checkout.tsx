import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Lock, Loader2 } from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";

export default function Checkout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => navigate("/order-success"), 2000);
  };

  return (
    <MarketingLayout>
      <div className="container py-12 max-w-2xl">
        <Link to="/dashboard/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Cart
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" /> Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="your@email.com" required />
              </div>
              <div className="space-y-2">
                <Label>Card Number</Label>
                <Input placeholder="4242 4242 4242 4242" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Expiry</Label><Input placeholder="MM/YY" required /></div>
                <div className="space-y-2"><Label>CVC</Label><Input placeholder="123" required /></div>
              </div>
              <div className="pt-4 border-t space-y-4">
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span>$108</span></div>
                <Button type="submit" disabled={isProcessing} className="w-full bg-lms-blue hover:bg-lms-blue/90 gap-2">
                  {isProcessing ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</> : <><Lock className="h-4 w-4" /> Pay Now</>}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MarketingLayout>
  );
}
