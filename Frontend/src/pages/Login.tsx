import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom" // added useNavigate
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
import { Mail } from "lucide-react"
import { apiPost } from "@/services/http.client"
import { useToast } from "@/hooks/use-toast"
import { toast } from "sonner"
import { apiRoutes } from "@/constants/apiRoutes"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("") // added error state
  const navigate = useNavigate() // added navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("") // clear previous errors

    try {
      await handleLogin(email, password)
      // The navigation happens in handleLogin on success
    } catch (error) {
      console.error("Login error:", error)
      setErrorMessage("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await apiPost(
        apiRoutes.auth.login,
        { email, password },
        {
          withCredentials: true,
        }
      )
      console.log("Login response", response)

      if (response && response.token) {
        toast.success("Login successful", {
          description: "Welcome back!",
          duration: 3000,
        })
        console.log("Login successful", response)
        localStorage.setItem("token", response.token)
        localStorage.setItem("user", JSON.stringify(response.user))
        navigate("/dashboard")
        return true
      } else {
        toast.error("Login failed", {
          description: "Invalid email or password",
          duration: 3000,
        })
        setErrorMessage("Invalid email or password")
        setIsLoading(false)
        return false
      }
    } catch (error) {
      console.log("error", error)
      toast.error("Authentication failed", {
        description: "Please check your credentials and try again",
        duration: 3000,
      })
      setErrorMessage("Login failed. Please check your credentials.")
      setIsLoading(false)
      return false
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="font-bold text-xl">Meetupps PRM</span>
          {/* brand fixed */}
        </Link>

        <Card className="border-none card-shadow">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome back
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {errorMessage && (
                <p className="text-sm text-red-500 text-center">
                  {errorMessage}
                </p> // show error
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log In"}
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

              {/* Google Button Placeholder */}
              <Button variant="outline" type="button" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Sign in with Google
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Login
