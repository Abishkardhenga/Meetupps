
import { useState } from "react";
import { Link } from "react-router-dom";
import AppNavbar from "@/components/AppNavbar";
import ReminderCard, { ReminderProps } from "@/components/ReminderCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, Plus } from "lucide-react";

const Reminders = () => {
  // Mock data
  const mockReminders: ReminderProps[] = [
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
    },
    {
      id: "3",
      title: "Quarterly catch-up call",
      date: "May 5, 2025",
      time: "3:30 PM",
      contactName: "David Chen",
      type: "custom"
    },
    {
      id: "4",
      title: "Send congratulations email",
      date: "April 25, 2025",
      contactName: "Emma Watson",
      type: "followup",
      completed: true
    }
  ];
  
  const [searchQuery, setSearchQuery] = useState("");
  const [reminders, setReminders] = useState(mockReminders);
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Filter reminders based on search and active tab
  const filteredReminders = reminders.filter(reminder => {
    const matchesSearch = searchQuery.trim() === "" || 
      reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (reminder.contactName && reminder.contactName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTab = 
      (activeTab === "upcoming" && !reminder.completed) || 
      (activeTab === "completed" && reminder.completed) ||
      activeTab === "all";
    
    return matchesSearch && matchesTab;
  });
  
  // Group reminders by date
  const groupedReminders: { [key: string]: ReminderProps[] } = {};
  filteredReminders.forEach(reminder => {
    if (!groupedReminders[reminder.date]) {
      groupedReminders[reminder.date] = [];
    }
    groupedReminders[reminder.date].push(reminder);
  });
  
  const sortedDates = Object.keys(groupedReminders).sort((a, b) => {
    // Simple string compare for this example
    // In a real app, convert to Date objects for proper sorting
    return a.localeCompare(b);
  });

  return (
    <div className="min-h-screen bg-muted/20">
      <AppNavbar />
      
      <main className="container mx-auto p-4 pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reminders</h1>
            <p className="text-muted-foreground">Never miss important dates and follow-ups.</p>
          </div>
          
          <Button asChild className="hover-scale">
            <Link to="/reminders/add">
              <Plus className="mr-2 h-4 w-4" />
              Add New Reminder
            </Link>
          </Button>
        </div>
        
        {/* Search and Tabs */}
        <div className="mb-6 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search reminders..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="upcoming">
                Upcoming
                <Badge className="ml-2 bg-primary/20 text-primary-foreground">{reminders.filter(r => !r.completed).length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed
                <Badge className="ml-2 bg-muted text-muted-foreground">{reminders.filter(r => r.completed).length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Reminders List */}
        <div className="space-y-8">
          {filteredReminders.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No reminders found</h3>
              <p className="text-muted-foreground">
                {activeTab === "upcoming" 
                  ? "You don't have any upcoming reminders" 
                  : "Try adjusting your search criteria"}
              </p>
              <Button className="mt-4" asChild>
                <Link to="/reminders/add">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Reminder
                </Link>
              </Button>
            </div>
          ) : (
            sortedDates.map(date => (
              <div key={date}>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-lg font-medium">{date}</h2>
                </div>
                
                <div className="space-y-3">
                  {groupedReminders[date].map(reminder => (
                    <ReminderCard key={reminder.id} reminder={reminder} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Reminders;
