import { createContext, useState, useEffect, useRef } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import api from "@/api/axios";
import qs from "qs";

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
    isPremium: false,
    premiumPlan: "",
  });

  const authInProgress = useRef(false);

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && user) {
        // Prefer unsafeMetadata (onboarding data) or fallback to Clerk profile
        const profile = user.unsafeMetadata?.profile || {};
        setUserData(prev => ({
          ...prev,
          fullName: user.fullName || "",
          email: user.primaryEmailAddress?.emailAddress || "",
          profilePhotoUrl: profile.avatarUrl || user.imageUrl || "",
          // Don't overwrite isPremium/premiumPlan if they already exist from a previous fetch
        }));

        // Background authentication with Talenex backend
        if (!authInProgress.current) {
          authInProgress.current = true;
          const authenticate = async () => {
            try {
              const token = await getToken({ template: "customJWT" });
              if (!token) {
                setLoading(false);
                return;
              }

              const response = await api.post("/auth/", {}, {
                headers: { Authorization: `Bearer ${token}` },
              });

              // console.log("Auth Response Data:", response.data);

              localStorage.setItem("token", response.data.token);
              localStorage.setItem("userId", response.data.userId);

              // 🚀 Fetch full details to get isPremium and other fields
              const detailRes = await api.get("/User/Details", {
                params: {
                  include: ["Profile"]
                },
                paramsSerializer: (params) =>
                  qs.stringify(params, { arrayFormat: "repeat" }),
                headers: { Authorization: `Bearer ${response.data.token}` }
              });

              // console.log("User Detail Response:", detailRes.data);

              setUserData(prev => {
                const updated = {
                  ...prev,
                  isPremium: detailRes.data.isPremium === true || detailRes.data.isPremium === 'true',
                  premiumPlan: detailRes.data.premiumPlan || "",
                  fullName: detailRes.data.profile?.fullName || "",
                  profilePhotoUrl: detailRes.data.profile?.profilePhotoUrl || "",
                  profileId: detailRes.data.profile?.id || "",
                  // Also update profile info if needed
                };
                // console.log("Updated UserData in Context:", updated);
                return updated;
              });

              setAuthVersion(v => v + 1);
            } catch (error) {
              console.error("Global Auth Error:", error);
            } finally {
              authInProgress.current = false;
              setLoading(false);
            }
          };
          authenticate();
        }
      } else {
        setLoading(false);
      }
    }
  }, [isLoaded, isSignedIn, user, getToken]);

  return (
    <UserContext.Provider value={{ userData, setUserData, loading, authVersion }}>
      {children}
    </UserContext.Provider>
  );
}