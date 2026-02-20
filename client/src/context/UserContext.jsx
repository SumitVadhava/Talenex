import { createContext, useState, useEffect, useRef } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import api from "@/api/axios";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [authVersion, setAuthVersion] = useState(() => (localStorage.getItem("token") ? 1 : 0));
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    profilePhotoUrl: "",
  });

  const authInProgress = useRef(false);

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

        // Background authentication with Talenex backend
        if (!authInProgress.current) {
          authInProgress.current = true;
          const authenticate = async () => {
            try {
              const token = await getToken({ template: "customJWT" });
              if (!token) return;

              const response = await api.post("/auth/", {}, {
                headers: { Authorization: `Bearer ${token}` },
              });

              localStorage.setItem("token", response.data.token);
              localStorage.setItem("userId", response.data.userId);
              setAuthVersion(v => v + 1);
            } catch (error) {
              console.error("Global Auth Error:", error);
            } finally {
              authInProgress.current = false;
            }
          };
          authenticate();
        }
      }
      setLoading(false);
    }
  }, [isLoaded, isSignedIn, user, getToken]);

  return (
    <UserContext.Provider value={{ userData, setUserData, loading, authVersion }}>
      {children}
    </UserContext.Provider>
  );
}