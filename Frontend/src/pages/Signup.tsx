import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail } from "lucide-react"
import { apiPost } from "@/services/http.client"
import { toast } from "sonner"
import { apiRoutes } from "@/constants/apiRoutes"

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("") // added error state

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")

    try {
      const success = await handleSignup(name, email, password)
      if (!success) {
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Signup error:", error)
      setErrorMessage("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  const handleSignup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await apiPost(apiRoutes.auth.signup, {
        name,
        email,
        password,
      })

      console.log("Signup response", response)
      if (response && response.message) {
        toast.success("Account created successfully", {
          description: `Welcome to MeetupPRM, ${name}!`,
          duration: 3000,
        })

        // Store authentication data
        localStorage.setItem("token", response.token)
        localStorage.setItem("user", JSON.stringify(response.user))

        // Navigate to dashboard after short delay to allow toast to be seen
        setTimeout(() => {
          navigate("/dashboard")
        }, 500)

        return true
      } else {
        // Handle unexpected response format
        toast.error("Registration failed", {
          description: "Please try again or contact support",
          duration: 4000,
        })
        setErrorMessage("Unable to create account. Please try again.")
        return false
      }
    } catch (error: any) {
      // More specific error handling based on error type
      if (error.response) {
        // Server responded with error status
        const status = error.response.status
        const errorMessage = error.response.data?.message || "Unknown error"

        if (status === 400) {
          // Bad request - usually validation errors
          toast.error("Invalid information", {
            description: errorMessage,
            duration: 4000,
          })
          setErrorMessage(errorMessage)
        } else if (status === 409) {
          // Conflict - usually email already exists
          toast.error("Account already exists", {
            description:
              "This email is already registered. Try logging in instead.",
            duration: 4000,
          })
          setErrorMessage(
            "This email is already registered. Try logging in instead."
          )
        } else {
          // Other server errors
          toast.error("Registration failed", {
            description: "Server error. Please try again later.",
            duration: 4000,
          })
          setErrorMessage(
            "Unable to process your request. Please try again later."
          )
        }
      } else if (error.request) {
        // No response received
        toast.error("Network error", {
          description:
            "Unable to connect to server. Please check your internet connection.",
          duration: 4000,
        })
        setErrorMessage(
          "Unable to connect to server. Please check your internet connection."
        )
      } else {
        // Something else went wrong
        toast.error("Registration failed", {
          description: "An unexpected error occurred. Please try again.",
          duration: 4000,
        })
        setErrorMessage("An unexpected error occurred. Please try again.")
      }

      return false
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="font-bold text-xl">MeetupPRM</span>
        </Link>

        <Card className="border-none card-shadow">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Start managing your relationships effectively
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hello@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button variant="outline" type="button" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Sign up with Google
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Signup
