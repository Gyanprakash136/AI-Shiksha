import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, ArrowRight } from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";

export default function OrderSuccess() {
  return (
    <MarketingLayout>
      <div className="container py-20 max-w-lg text-center">
        <Card>
          <CardContent className="p-8">
            <div className="h-20 w-20 rounded-full bg-lms-emerald/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-lms-emerald" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground mb-6">Thank you for your purchase. You can now access your courses.</p>
            <div className="space-y-3">
              <Link to="/dashboard/my-courses">
                <Button className="w-full bg-lms-blue hover:bg-lms-blue/90 gap-2">
                  <BookOpen className="h-4 w-4" /> Go to My Courses
                </Button>
              </Link>
              <Link to="/dashboard/catalog">
                <Button variant="outline" className="w-full gap-2">Browse More Courses <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </MarketingLayout>
  );
}
