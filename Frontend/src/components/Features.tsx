
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Mail, Search, User } from "lucide-react";

const featuresData = [
  {
    title: "Save Contacts",
    description: "Easily add contacts with detailed information, categorize them, and add personalized notes about every interaction.",
    icon: User,
    color: "bg-meetup-blue/20",
    textColor: "text-meetup-blue"
  },
  {
    title: "Birthday Reminders",
    description: "Never miss important dates. Get timely reminders for birthdays, anniversaries, and follow-ups.",
    icon: Calendar,
    color: "bg-meetup-orange/20",
    textColor: "text-meetup-orange"
  },
  {
    title: "AI Email Generator",
    description: "Draft personalized emails quickly with our AI assistant that knows your connection history.",
    icon: Mail,
    color: "bg-meetup-green/20",
    textColor: "text-meetup-green"
  },
  {
    title: "Search and Filters",
    description: "Find anyone in your network with powerful search and filtering by tags, events, locations, and more.",
    icon: Search,
    color: "bg-meetup-purple/20",
    textColor: "text-meetup-purple"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-muted/30" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Features You'll Love</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to maintain meaningful relationships with people you meet at events, school, college, and work.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresData.map((feature, index) => (
            <Card key={index} className="border-none card-shadow hover-scale transition-all duration-300">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className={`${feature.textColor}`} size={24} />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
