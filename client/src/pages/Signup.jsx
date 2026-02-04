import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" afterSignOutUrl="/onboarding"
      appearance={{
          elements: {
            rootBox: {
              maxHeight: "800px",
            },
            card: {
              maxHeight: "800px",
              padding: "25px",
              borderRadius: "16px",
            },
            formContainer: {
              maxHeight: "700px",
              overflowY: "auto",
            },
          },
        }}
      />
    </div>
  );
}