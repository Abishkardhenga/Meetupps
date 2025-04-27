
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-64 h-64 rounded-full bg-meetup-blue/20 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-20 w-80 h-80 rounded-full bg-meetup-orange/20 blur-3xl -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-enter">
            Your memory for every <span className="gradient-text">meaningful connection</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-enter" style={{animationDelay: "100ms"}}>
            Never forget a connection again. MeetupPRM helps you nurture relationships 
            that matter with smart reminders, contact management, and AI-powered outreach.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-enter" style={{animationDelay: "200ms"}}>
            <Button size="lg" asChild className="hover-scale">
              <Link to="/signup">Start Building Stronger Relationships</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="hover-scale">
              <Link to="/features">Explore Features</Link>
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 animate-enter" style={{animationDelay: "300ms"}}>
            {[
              { title: "800+", subtitle: "Active Users" },
              { title: "15,000+", subtitle: "Relationships Managed" },
              { title: "92%", subtitle: "User Retention" }
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-3xl font-bold">{stat.title}</span>
                <span className="text-muted-foreground">{stat.subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
