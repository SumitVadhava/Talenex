import { SignIn } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

export default function Login() {
  const location = useLocation();
  const from = location.state?.from || "/home";

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl={from}
      />
    </div>
  );
}