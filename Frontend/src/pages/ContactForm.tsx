
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "@/components/AppNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

const ContactForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    name: isEdit ? "Sarah Miller" : "",
    email: isEdit ? "sarah.miller@example.com" : "",
    phone: isEdit ? "(555) 867-5309" : "",
    birthday: isEdit ? "1990-05-15" : "",
    notes: isEdit ? "Met at TechCrunch Disrupt. Interested in AI startups and might be a potential investor for our next round." : "",
  });
  
  // Tags management
  const [tags, setTags] = useState<string[]>(isEdit ? ["Tech Conference", "Investor"] : []);
  const [newTag, setNewTag] = useState("");
  
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting contact:", { ...formData, tags });
    
    // Simulate API call
    setTimeout(() => {
      navigate("/contacts");
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-muted/20">
      <AppNavbar />
      
      <main className="container mx-auto p-4 pt-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{isEdit ? "Edit Contact" : "Add New Contact"}</h1>
          <p className="text-muted-foreground">
            {isEdit ? "Update contact information" : "Create a new contact to add to your network"}
          </p>
        </div>
        
        <Card className="border-none card-shadow">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="birthday">Birthday</Label>
                  <Input 
                    id="birthday"
                    name="birthday"
                    type="date"
                    value={formData.birthday}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2 flex-wrap mb-2">
                  {tags.map(tag => (
                    <Badge key={tag} className="flex gap-1 items-center">
                      {tag}
                      <X 
                        size={14} 
                        className="cursor-pointer" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input 
                    id="newTag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag (e.g. Work, College, Event)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={addTag}>
                    <Plus size={18} />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add notes about how you met, conversation topics, etc."
                  rows={4}
                />
              </div>
              
              <div className="flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/contacts")}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isEdit ? "Update Contact" : "Create Contact"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ContactForm;
