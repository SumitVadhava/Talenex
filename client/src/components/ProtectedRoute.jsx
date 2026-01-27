import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute component that ensures only authenticated users can access certain routes
 * @param {React.ReactNode} children - The component(s) to render if user is authenticated
 * @param {boolean} requireOnboarding - If true, also checks if onboarding is completed (default: false)
 * @param {string} redirectTo - Custom redirect path when not authenticated (default: "/sign-in")
 */
export default function ProtectedRoute({ 
  children, 
  requireOnboarding = false,
  redirectTo = "/sign-in" 
}) {
  const { user, isLoaded, isSignedIn } = useUser();

  // Show nothing while loading
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  // If onboarding is required, check if it's completed
  if (requireOnboarding) {
    const onboardingCompleted = user?.unsafeMetadata?.onboardingCompleted;
    
    if (!onboardingCompleted) {
      return <Navigate to="/onboarding" replace />;
    }
  }

  // User is authenticated (and optionally onboarded), render children
  return children;
}
