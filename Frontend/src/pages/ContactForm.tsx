import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import AppNavbar from "@/components/AppNavbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { apiGet, apiPost, apiPut } from "@/services/http.client"
import { apiRoutes } from "@/constants/apiRoutes"
import { toast } from "sonner"
import { useCookies } from "react-cookie"

const ContactForm = ({ isEdit = false }) => {
  const navigate = useNavigate()

  const [cookies, setCookie, removeCookie] = useCookies(["user_info"])
  const { id } = useParams()
  console.log("userparams", id)

  useEffect(() => {
    console.log("cookies", cookies.user_info)
    console.log("cookies op", document.cookie)
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    notes: "",
  })

  // Tags management
  const [tags, setTags] = useState<string[]>(
    isEdit ? ["Tech Conference", "Investor"] : []
  )
  const [newTag, setNewTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  useEffect(() => {
    if (isEdit && id) {
      getIndividualContact(id)
    }
  }, [isEdit, id])

  const getIndividualContact = async (id: string) => {
    console.log("Fetching contact with ID:", id)

    try {
      const token = localStorage.getItem("token")
      const { contact } = await apiGet(apiRoutes.contacts.view(id), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      console.log("Contact data received:", contact)

      if (contact) {
        setFormData({
          name: contact.name || "",
          email: contact.email || "",
          phone: contact.phone || "",
          birthday: contact.birthday || "",
          notes: contact.notes || "",
        })

        if (contact.tags && Array.isArray(contact.tags)) {
          setTags(contact.tags)
        }
      }
    } catch (error) {
      console.error("Error fetching contact:", error)
      toast.error("Failed to load contact data")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Form validation
    if (!formData.name.trim()) {
      toast.error("Name required", {
        description: "Please provide a contact name",
        duration: 3000,
      })
      return
    }

    // Create or update the contact based on isEdit flag
    if (isEdit) {
      updateContact()
    } else {
      createContact()
    }
  }
  const createContact = async () => {
    try {
      // Show loading state
      setIsSubmitting(true)
      const token = localStorage.getItem("token")

      const contactData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        birthday: formData.birthday || undefined,
        notes: formData.notes, // This looks correct
        tags: tags,
      }
      console.log("Form data before submission:", formData) // Check if notes exists here

      const response = await apiPost(apiRoutes.contacts.create, contactData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      if (response) {
        toast.success("Contact created", {
          description: `${formData.name} has been added to your contacts`,
          duration: 3000,
        })

        // Redirect to contacts list after short delay
        setTimeout(() => {
          navigate("/contacts")
        }, 1000)
      }
    } catch (error) {
      console.error("Error creating contact:", error)
      toast.error("Failed to create contact", {
        description: "Please try again or check your connection",
        duration: 4000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateContact = async () => {
    try {
      setIsSubmitting(true)
      const token = localStorage.getItem("token")

      const contactData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        birthday: formData.birthday || undefined,
        notes: formData.notes,
        tags: tags,
      }

      console.log("Updating contact with data:", contactData)

      const response = await apiPut(
        apiRoutes.contacts.update(id as string),
        contactData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )

      if (response) {
        toast.success("Contact updated", {
          description: `${formData.name}'s information has been updated`,
          duration: 3000,
        })

        // Redirect to contacts list after short delay
        setTimeout(() => {
          navigate("/contacts")
        }, 1000)
      }
    } catch (error) {
      console.error("Error updating contact:", error)
      toast.error("Failed to update contact", {
        description: "Please try again or check your connection",
        duration: 4000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <AppNavbar />

      <main className="container mx-auto p-4 pt-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            {isEdit ? "Edit Contact" : "Add New Contact"}
          </h1>
          <p className="text-muted-foreground">
            {isEdit
              ? "Update contact information"
              : "Create a new contact to add to your network"}
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
                  {tags.map((tag) => (
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
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTag()
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
  )
}

export default ContactForm
