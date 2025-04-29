import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Mail, Phone, Calendar, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"
import { apiRoutes } from "@/constants/apiRoutes"
import { apiDelete, apiPut } from "@/services/http.client"
import { toast } from "sonner"
import { Link } from "react-router-dom"

export interface ContactProps {
  _id?: string
  userId: string
  name: string
  email: string
  phone?: string
  image?: string
  notes: string
  birthday?: string
  tags?: string[]
}

const ContactCard = ({ contact }: { contact: ContactProps }) => {
  console.log("contact card", contact)
  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const deleteContact = async (id: string) => {
    try {
      const token = localStorage.getItem("token")

      // Show loading toast
      toast.loading("Deleting contact...")

      const response = await apiDelete(
        apiRoutes.contacts.delete(id),
        undefined,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )

      // Dismiss loading toast and show success
      toast.dismiss()
      toast.success("Contact deleted", {
        description: "The contact has been successfully removed",
        duration: 3000,
      })

      // Refresh the page or update the UI
      window.location.reload()

      return response
    } catch (error) {
      console.error("Error deleting contact:", error)
      toast.dismiss()
      toast.error("Failed to delete contact", {
        description: "Please try again later",
        duration: 4000,
      })
    }
  }

  return (
    <Card className="border-none card-shadow hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={contact.image} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-lg font-medium truncate">{contact.name}</h3>

              <div className="flex gap-2 flex-wrap">
                {contact.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-3">
              {contact.email && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail size={14} />
                  <span className="truncate">{contact.email}</span>
                </div>
              )}

              {contact.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone size={14} />
                  <span>{contact.phone}</span>
                </div>
              )}

              {contact.birthday && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar size={14} />
                  <span>{contact.birthday}</span>
                </div>
              )}
            </div>

            {contact.notes && (
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                {contact.notes}
              </p>
            )}
          </div>

          <div className="flex sm:flex-col gap-2 sm:self-start">
            <Button size="sm" variant="outline">
              View
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <Link to={`/contacts/edit/${contact._id}`}>
                  <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Send Email</DropdownMenuItem>
                <DropdownMenuItem>Add Reminder</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => deleteContact(contact._id)}
                  className="text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ContactCard
