import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function OnboardingGuard({ children }) {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;

  if (!isSignedIn) return <Navigate to="/" />;

  const completed = user?.unsafeMetadata?.onboardingCompleted;

  if (!completed) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}
