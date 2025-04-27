
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-meetup-blue/30 to-meetup-purple/30 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Strengthen Your Relationships?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of people using MeetupPRM to nurture their personal and professional networks.
          </p>
          <Button size="lg" className="hover-scale" asChild>
            <Link to="/signup">Start Building Stronger Relationships</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
