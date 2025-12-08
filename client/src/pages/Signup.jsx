import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in"
      appearance={{
          elements: {
            rootBox: {
              maxHeight: "750px",
            },
            card: {
              maxHeight: "600px",
              padding: "20px",
              borderRadius: "16px",
            },
            formContainer: {
              maxHeight: "550px",
              overflowY: "auto",
            },
          },
        }}
      />
    </div>
  );
}