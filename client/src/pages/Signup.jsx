import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
    </div>
  );
}