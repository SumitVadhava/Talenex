import { createContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const { user, isLoaded, isSignedIn } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    profilePhotoUrl: "",
  });

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && user) {
        // Prefer unsafeMetadata (onboarding data) or fallback to Clerk profile
        const profile = user.unsafeMetadata?.profile || {};
        setUserData({
          fullName: user.fullName || "",
          email: user.primaryEmailAddress?.emailAddress || "",
          profilePhotoUrl: profile.avatarUrl || user.imageUrl || "",
        });
      }
      setLoading(false);
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <UserContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
}