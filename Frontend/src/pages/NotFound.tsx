
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="rounded-md bg-primary p-2">
            <span className="font-bold text-lg text-primary-foreground">MPrm</span>
          </div>
        </div>
        
        <h1 className="text-7xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't seem to exist. You might have mistyped the address
          or the page may have moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
          <Button variant="outline">
            <Link to="/contacts">Go to Contacts</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
