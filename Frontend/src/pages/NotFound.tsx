import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lms-navy">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground">LearnAI</span>
        </Link>

        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-[120px] font-bold leading-none text-lms-navy/10">404</div>
          <div className="relative -mt-16">
            <div className="flex h-24 w-24 mx-auto items-center justify-center rounded-full bg-lms-blue/10">
              <Search className="h-12 w-12 text-lms-blue" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline">
            <Link to="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
          <Button asChild className="bg-lms-blue hover:bg-lms-blue/90">
            <Link to="/" className="gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Need help?{" "}
          <Link to="/contact" className="text-lms-blue hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;