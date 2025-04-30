import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AppNavbar from "@/components/AppNavbar"
import ReminderCard, { ReminderProps } from "@/components/ReminderCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Calendar, Plus } from "lucide-react"
import { apiGet } from "@/services/http.client"
import { apiRoutes } from "@/constants/apiRoutes"
import { format, parseISO } from "date-fns"

const Reminders = () => {
  interface Contact {
    _id: string
    name: string
    email: string
  }

  interface Reminder {
    _id: string
    userId: string
    contactId: Contact
    reminderType: "birthday" | "custom" | "followup"
    reminderDate: string // ISO Date string
    message: string
    isSent: boolean
    createdAt: string // ISO Date string
    __v: number
  }

  const [allReminders, setAllReminders] = useState<Reminder[] | null>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("upcoming")

  const getAllReminders = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem("token")
      const data = await apiGet(apiRoutes.reminders.list, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setAllReminders(data)
      console.log("get all reminders", data)
    } catch (error) {
      console.error("Error fetching reminders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAllReminders()
  }, [])

  // Convert API reminders to the format expected by ReminderCard
  const convertRemindersToProps = (reminders: Reminder[]): ReminderProps[] => {
    if (!reminders) return []

    return reminders.map((reminder) => ({
      id: reminder._id,
      title: reminder.message,
      date: format(parseISO(reminder.reminderDate), "MMMM d, yyyy"),
      time: format(parseISO(reminder.reminderDate), "h:mm a"),
      contactName: reminder.contactId?.name || "Unknown Contact",
      type: reminder.reminderType,
      completed: reminder.isSent,
    }))
  }

  // Get formatted reminders
  const reminders = allReminders ? convertRemindersToProps(allReminders) : []

  // Filter reminders based on search and active tab
  const filteredReminders = reminders.filter((reminder) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (reminder.contactName &&
        reminder.contactName.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTab =
      (activeTab === "upcoming" && !reminder.completed) ||
      (activeTab === "completed" && reminder.completed) ||
      activeTab === "all"

    return matchesSearch && matchesTab
  })

  // Group reminders by date
  const groupedReminders: { [key: string]: ReminderProps[] } = {}
  filteredReminders.forEach((reminder) => {
    if (!groupedReminders[reminder.date]) {
      groupedReminders[reminder.date] = []
    }
    groupedReminders[reminder.date].push(reminder)
  })

  const sortedDates = Object.keys(groupedReminders).sort((a, b) => {
    // Convert strings to Date objects for proper sorting
    const dateA = new Date(a)
    const dateB = new Date(b)
    return dateA.getTime() - dateB.getTime()
  })

  return (
    <div className="min-h-screen bg-muted/20">
      <AppNavbar />

      <main className="container mx-auto p-4 pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reminders</h1>
            <p className="text-muted-foreground">
              Never miss important dates and follow-ups.
            </p>
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
                <Badge className="ml-2 bg-primary/20 text-primary-foreground">
                  {reminders.filter((r) => !r.completed).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed
                <Badge className="ml-2 bg-muted text-muted-foreground">
                  {reminders.filter((r) => r.completed).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Reminders List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p>Loading reminders...</p>
          </div>
        ) : (
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
              sortedDates.map((date) => (
                <div key={date}>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <h2 className="text-lg font-medium">{date}</h2>
                  </div>

                  <div className="space-y-3">
                    {groupedReminders[date].map((reminder) => (
                      <ReminderCard key={reminder.id} reminder={reminder} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default Reminders
