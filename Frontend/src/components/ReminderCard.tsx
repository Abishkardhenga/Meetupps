
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface ReminderProps {
  id: string;
  title: string;
  date: string;
  time?: string;
  contactName?: string;
  type: "birthday" | "followup" | "custom";
  completed?: boolean;
}

const ReminderCard = ({ reminder }: { reminder: ReminderProps }) => {
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "birthday":
        return "default";
      case "followup":
        return "secondary";
      case "custom":
        return "outline";
      default:
        return "default";
    }
  };
  
  return (
    <Card className={`border-none card-shadow hover:shadow-lg transition-shadow ${reminder.completed ? 'opacity-60' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={getBadgeVariant(reminder.type)}>
                {reminder.type.charAt(0).toUpperCase() + reminder.type.slice(1)}
              </Badge>
              {reminder.completed && (
                <Badge variant="outline" className="bg-muted">
                  Completed
                </Badge>
              )}
            </div>
            
            <h3 className="text-base font-medium">{reminder.title}</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4 mt-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar size={14} />
                <span>{reminder.date}</span>
              </div>
              
              {reminder.time && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={14} />
                  <span>{reminder.time}</span>
                </div>
              )}
              
              {reminder.contactName && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User size={14} />
                  <span>{reminder.contactName}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            {!reminder.completed ? (
              <>
                <Button size="sm">Complete</Button>
                <Button size="sm" variant="outline">Snooze</Button>
              </>
            ) : (
              <Button size="sm" variant="outline">Restore</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReminderCard;
