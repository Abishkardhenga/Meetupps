
import { useState } from "react";
import { Link } from "react-router-dom";
import AppNavbar from "@/components/AppNavbar";
import ContactCard, { ContactProps } from "@/components/ContactCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, X } from "lucide-react";

const Contacts = () => {
  // Mock data
  const mockContacts: ContactProps[] = [
    {
      id: "1",
      name: "Sarah Miller",
      email: "sarah.miller@example.com",
      phone: "(555) 867-5309",
      tags: ["Tech Conference", "Investor"],
      birthday: "May 15",
      notes: "Met at TechCrunch Disrupt. Interested in AI startups and might be a potential investor for our next round."
    },
    {
      id: "2",
      name: "David Chen",
      email: "david.chen@example.com",
      phone: "(555) 123-4567",
      tags: ["College", "Marketing"],
      notes: "Former classmate from Stanford. Works in marketing at Google now."
    },
    {
      id: "3",
      name: "Emma Watson",
      email: "emma.w@example.com",
      phone: "(555) 234-5678",
      tags: ["Startup Event", "Designer"],
      birthday: "April 15",
      notes: "Met at the Design Week. She's a UX designer interested in our product."
    },
    {
      id: "4",
      name: "Michael Johnson",
      email: "michael.j@example.com",
      tags: ["Work", "Engineering"],
      notes: "Senior engineer at Facebook. Good contact for technical advice."
    }
  ];
  
  const availableTags = ["Tech Conference", "Investor", "College", "Marketing", "Startup Event", "Designer", "Work", "Engineering"];
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [contacts, setContacts] = useState(mockContacts);
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery("");
  };
  
  // Filter contacts based on search query and selected tags
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = searchQuery.trim() === "" || 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (contact.email && contact.email.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTags = selectedTags.length === 0 || 
      (contact.tags && selectedTags.some(tag => contact.tags?.includes(tag)));
    
    return matchesSearch && matchesTags;
  });

  return (
    <div className="min-h-screen bg-muted/20">
      <AppNavbar />
      
      <main className="container mx-auto p-4 pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Contacts</h1>
            <p className="text-muted-foreground">Manage your network of connections.</p>
          </div>
          
          <Button asChild className="hover-scale">
            <Link to="/contacts/add">
              <Plus className="mr-2 h-4 w-4" />
              Add New Contact
            </Link>
          </Button>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or email..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <select 
                className="w-full h-10 pl-9 pr-8 border rounded-md focus:ring-2 focus:ring-offset-0 focus:ring-offset-background focus:ring-primary"
              >
                <option value="">Sort by: Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="recent">Recently Added</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium mr-1">Filter by tag:</span>
            {availableTags.map(tag => (
              <Badge 
                key={tag} 
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
            
            {(selectedTags.length > 0 || searchQuery) && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-2">
                <X className="h-4 w-4 mr-1" /> Clear filters
              </Button>
            )}
          </div>
        </div>
        
        {/* Contact List */}
        <div className="space-y-4">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No contacts found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredContacts.map(contact => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Contacts;
