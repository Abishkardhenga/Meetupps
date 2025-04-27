
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Startup Founder",
    image: "",
    content: "MeetupPRM has transformed how I manage my professional network. I've been able to maintain relationships with investors and mentors that would have otherwise fallen through the cracks.",
    initials: "AJ"
  },
  {
    name: "Sarah Williams",
    role: "Event Coordinator",
    image: "",
    content: "As someone who meets hundreds of people at events, this app has been a game changer. The reminder system ensures I follow up at just the right time.",
    initials: "SW"
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    image: "",
    content: "The AI email drafts save me so much time! They're personalized and warm, making it easy to reconnect with people I met months ago.",
    initials: "MC"
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from people who use MeetupPRM to strengthen their personal and professional relationships.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none card-shadow hover-scale transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="italic text-muted-foreground mb-4">"{testimonial.content}"</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
