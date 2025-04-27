
import { Button } from "@/components/ui/button";

const WhyItMatters = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold mb-6">Why It Matters</h2>
            
            <div className="space-y-6">
              <div className="bg-meetup-blue/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Relationships Require Attention</h3>
                <p className="text-muted-foreground">
                  In today's fast-paced world, it's easy to lose touch with people who matter. MeetupPRM helps you stay connected with minimal effort.
                </p>
              </div>
              
              <div className="bg-meetup-orange/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Quality Over Quantity</h3>
                <p className="text-muted-foreground">
                  Focus on building deeper connections with people rather than expanding your network without purpose.
                </p>
              </div>
              
              <div className="bg-meetup-green/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Professional Growth</h3>
                <p className="text-muted-foreground">
                  Your professional network is one of your most valuable assets. Nurture it to create opportunities for collaboration and growth.
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <Button size="lg" className="hover-scale">Learn More</Button>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-meetup-purple/20 to-meetup-blue/20 p-8 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Abstract networking visualization */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-meetup-blue"></div>
                <div className="absolute top-3/4 left-1/3 w-3 h-3 rounded-full bg-meetup-orange"></div>
                <div className="absolute top-1/2 left-2/3 w-5 h-5 rounded-full bg-meetup-green"></div>
                <div className="absolute top-1/5 left-3/5 w-3 h-3 rounded-full bg-meetup-purple"></div>
                
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  <line x1="100" y1="100" x2="133" y2="300" stroke="#A0D2EB" strokeWidth="1" />
                  <line x1="133" y1="300" x2="266" y2="200" stroke="#FFC8A2" strokeWidth="1" />
                  <line x1="266" y1="200" x2="100" y2="100" stroke="#D5ECC2" strokeWidth="1" />
                  <line x1="240" y1="80" x2="266" y2="200" stroke="#E5DEFF" strokeWidth="1" />
                  <line x1="240" y1="80" x2="100" y2="100" stroke="#FFDEE2" strokeWidth="1" />
                </svg>
                
                {/* Central element */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <span className="text-2xl font-bold">You</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItMatters;
