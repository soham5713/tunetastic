import SignUpForm from "../auth/SignUpForm"
import { Link } from "react-router-dom"

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-8 text-primary">Tunetastic</h1>
      <SignUpForm />
      <p className="mt-4 text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}

export default SignUp

