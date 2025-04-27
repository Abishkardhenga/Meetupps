
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppNavbar from "@/components/AppNavbar";
import StatCard from "@/components/StatCard";
import ContactCard, { ContactProps } from "@/components/ContactCard";
import ReminderCard, { ReminderProps } from "@/components/ReminderCard";
import { Calendar, User, Bell, Plus } from "lucide-react";

const Dashboard = () => {
  // Mock data for demonstration
  const recentContacts: ContactProps[] = [
    {
      id: "1",
      name: "Sarah Miller",
      email: "sarah.miller@example.com",
      tags: ["Tech Conference", "Investor"],
      notes: "Met at TechCrunch Disrupt. Interested in AI startups and might be a potential investor for our next round."
    },
    {
      id: "2",
      name: "David Chen",
      email: "david.chen@example.com",
      phone: "(555) 123-4567",
      tags: ["College", "Marketing"],
      notes: "Former classmate from Stanford. Works in marketing at Google now."
    }
  ];
  
  const upcomingReminders: ReminderProps[] = [
    {
      id: "1",
      title: "Alex's Birthday",
      date: "April 28, 2025",
      contactName: "Alex Johnson",
      type: "birthday"
    },
    {
      id: "2",
      title: "Follow up on project proposal",
      date: "April 30, 2025",
      time: "10:00 AM",
      contactName: "Maria Garcia",
      type: "followup"
    }
  ];

  return (
    <div className="min-h-screen bg-muted/20">
      <AppNavbar />
      
      <main className="container mx-auto p-4 pt-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, John</h1>
          <p className="text-muted-foreground">Here's what's happening with your network.</p>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Total Contacts" 
            value={124} 
            description="+4 this week"
            icon={User}
            color="bg-meetup-blue/20"
          />
          <StatCard 
            title="Upcoming Birthdays" 
            value={3}
            description="Next 30 days"
            icon={Calendar}
            color="bg-meetup-orange/20"
          />
          <StatCard 
            title="Pending Follow-ups" 
            value={7}
            description="5 are due this week"
            icon={Bell}
            color="bg-meetup-green/20"
          />
          <Card className="border-none card-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button size="sm" className="justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Add New Contact
              </Button>
              <Button size="sm" variant="outline" className="justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Create Reminder
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Contacts Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Contacts</h2>
              <Button variant="ghost" asChild>
                <Link to="/contacts">View all</Link>
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentContacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
              
              <Card className="border-dashed border-2 p-6 flex flex-col items-center justify-center text-center hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">Add a new contact</h3>
                <p className="text-sm text-muted-foreground mb-4">Keep track of people you meet</p>
                <Button asChild>
                  <Link to="/contacts/add">Add Contact</Link>
                </Button>
              </Card>
            </div>
          </section>
          
          {/* Upcoming Reminders Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Upcoming Reminders</h2>
              <Button variant="ghost" asChild>
                <Link to="/reminders">View all</Link>
              </Button>
            </div>
            
            <div className="space-y-4">
              {upcomingReminders.map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
              
              <Card className="border-dashed border-2 p-6 flex flex-col items-center justify-center text-center hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">Add a new reminder</h3>
                <p className="text-sm text-muted-foreground mb-4">Never miss important dates</p>
                <Button asChild>
                  <Link to="/reminders/add">Add Reminder</Link>
                </Button>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
