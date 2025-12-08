import { SignIn } from "@clerk/clerk-react";

export default function   Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn routing="path"
        path="/sign-in"
        signUpUrl="/sign-up" />
    </div>
  );
}