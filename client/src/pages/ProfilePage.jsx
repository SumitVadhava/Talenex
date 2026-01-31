import {
  User,
  Settings,
  Bell,
  Shield,
  Award,
  Zap,
  Star,
  Calendar,
} from "lucide-react";
import React, { useState, useEffect } from "react";
// import { MOCK_USER } from './constants';
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { StatsSection } from "../components/StatsSection";
import { SkillsSection } from "../components/SkillsSection";
import { AchievementsSection } from "../components/AchievementsSection";
import { AvailabilityTab } from "../components/AvailabilityTab";
import { NotificationsTab } from "../components/NotificationsTab";
import { PrivacyTab } from "../components/PrivacyTab";
import { SettingsTab } from "../components/SettingsTab";
import { Textarea } from "../components/ui/Primitives";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import qs from "qs";
import { useUser } from "@clerk/clerk-react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { user: clerkUser } = useUser();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [sectionIds, setSectionIds] = useState({
    availability: null,
    notifications: null,
    privacy: null,
    skills: null,
    profile: null,
  });
  const mappingSection = {
    availability: "UserAvailbility",
    notifications: "UserNotificationPreferences",
    privacy: "UserPrivacy",
  };

  // Simulate Database Fetch
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Simulate network delay
    try {
      const response = await axios.get(
        "http://localhost:5296/api/User/Details",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            include: [
              "Profile",
              "Skills",
              "Availability",
              "Privacy",
              "Reputation",
              "Notifications",
            ],
          },
          paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: "repeat" }),
        },
      );
      console.log(response.data);
      console.log("Fetched user data:", response.data);

      const mapped = mapApiUserToMockUser(response.data);
      setSectionIds({
        availability: response.data.availability?.id,
        notifications: response.data.notifications?.id,
        privacy: response.data.privacy?.id,
        skills: response.data.skills?.id,
        profile: response.data.profile?.id,
      });
      setUser(mapped);
      setEditedUser(mapped);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const mapApiUserToMockUser = (api) => {
    return {
      id: api.profile?.userId || api.id,

      name: api.profile?.fullName || "", // --
      handle: api.email || "", // -- |
      location: api.profile?.location || "", // --
      avatarUrl: api.profile?.profilePhotoUrl || "",
      bio: api.profile?.bio || "", // --
      username: api.profile?.username,
      longitude: api.profile?.longitude,
      latitude: api.profile?.latitude,

      stats: {
        swapsCompleted: 0,
        responseRate: 0,
        memberSince: api.createdAt
          ? new Date(api.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })
          : "",
        rating: api.reputation?.averageRating || 0,
      },

      skillsOffered:
        api.skills?.skillsOffered?.map((skill, index) => ({
          id: index.toString(),
          name: skill.title,
          level: skill.level,
          category: skill.category,
        })) || [],

      skillsWanted:
        api.skills?.skillsWanted?.map((skill, index) => ({
          id: index.toString(),
          name: skill.name,
          level: skill.level,
        })) || [],

      achievements: [],

      preferences: {
        availability: {
          weekdays: api.availability?.availableOnWeekdays ?? false,
          weekends: api.availability?.availableOnWeekends ?? false,
          duration:
            api.availability?.preferredSessionDuration?.toString() || "30",
          mode: api.availability?.preferredSessionMode || "online",
        },

        notifications: {
          message: api.notifications?.notifyOnMessage ?? true,
          swapRequest: api.notifications?.notifyOnSwapRequest ?? true,
          rating: api.notifications?.notifyOnRatingReceived ?? true,
        },

        privacy: {
          publicProfile: api.privacy?.isProfilePublic ?? true,
          showLocation: api.privacy?.showLocation ?? true,
          showSkills: api.privacy?.showSkills ?? true,
        },

        settings: {
          email: api.email || "",
          language: "en",
          twoFactor: false,
        },
      },
    };
  };

  // Simulate PATCH request for specific sections
  const updateUser = async (section, partialData) => {
    const sectionInfo = mappingSection[section];

    // Optimistic UI Update or Post-Fetch Update
    setUser((prev) => {
      if (!prev) return prev;
      // Handle nested preference updates
      if (
        ["availability", "notifications", "privacy", "settings"].includes(
          section,
        )
      ) {
        return {
          ...prev,
          preferences: {
            ...prev.preferences,
            [section]: {
              ...prev.preferences[section],
              ...partialData,
            },
          },
        };
      }
      // Handle top-level updates (General tab)
      return { ...prev, ...partialData };
    });
  };

  const putSection = async (section, payload) => {
    const id = sectionIds[section];

    if (!id) {
      console.log(`No ID found for section: ${section}`);
      return;
    }

    console.log(payload);
    try {
      await axios.put(
        `http://localhost:5296/api/${mappingSection[section]}/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
    } catch (error) {
      console.error(`Error updating ${section}:`, error);
    }
  };

  const updateAvailability = async (data) => {
    const merged = { ...user.preferences.availability, ...data };
    console.log(merged);

    await putSection("availability", {
      availableOnWeekdays:
        merged.weekdays !== undefined ? merged.weekdays : false,
      availableOnWeekends:
        merged.weekends !== undefined ? merged.weekends : false,
      preferredSessionDuration: Number(
        merged.duration !== undefined ? merged.duration : 30,
      ),
      preferredSessionMode: merged.mode !== undefined ? merged.mode : "online",
    });

    console.log(user);
    setUser((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, availability: merged },
    }));
  };

  const updateNotifications = async (data) => {
    const merged = {
      ...user.preferences.notifications,
      ...data,
    };

    await putSection("notifications", {
      notifyOnMessage: merged.message,
      notifyOnSwapRequest: merged.swapRequest,
      notifyOnRatingReceived: merged.rating,
    });

    setUser((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: merged,
      },
    }));
  };

  const updatePrivacy = async (data) => {
    const merged = { ...user.preferences.privacy, ...data };

    await putSection("privacy", {
      isProfilePublic:
        merged.publicProfile !== undefined ? merged.publicProfile : true,
      showLocation:
        merged.showLocation !== undefined ? merged.showLocation : true,
      showSkills: merged.showSkills !== undefined ? merged.showSkills : true,
    });

    setUser((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, privacy: merged },
    }));
  };

  const updateSkills = async () => {
    const id = sectionIds.skills;

    if (!id) {
      console.log(`No ID found for section: skills`);
      return;
    }
    await axios.put(
      `http://localhost:5296/api/UserSkills/${id}`,
      {
        skillsOffered: editedUser.skillsOffered.map((s) => ({
          title: s.name,
          category: s.category,
          level: s.level,
        })),
        skillsWanted: editedUser.skillsWanted.map((s) => ({
          name: s.name,
          level: s.level,
        })),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  };

  const updateProfile = async () => {
    const id = sectionIds.profile;
    const payload = {
      fullName: editedUser.name || "",
      username: user.username,
      bio: editedUser.bio || "",
      profilePhotoUrl: editedUser.avatarUrl,
      location: editedUser.location || "",
      latitude: user.latitude,
      longitude: user.longitude,
    };

    console.log("profile payload", payload);

    if (!id) {
      console.log(`No ID found for section: profile`);
      return;
    }

    await axios.put(
      `http://localhost:5296/api/UserProfile/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    const existingMetadata = clerkUser.unsafeMetadata || {};

    await clerkUser.update({
      unsafeMetadata: {
        ...existingMetadata,// ✅ keeps ALL existing keys
        fullName: editedUser.name, 
        profile: {
          ...(existingMetadata.profile || {}), // ✅ keeps profile.bio, username, etc.
          avatarUrl: editedUser.avatarUrl       // ✅ only updates avatar
        }
      }
    });
  };

  const handleEditToggle = () => {
    setEditedUser(user);
    setIsEditing(true);
  };

  const handleSave = async () => {
    await Promise.all([updateProfile(), updateSkills()]);

    setUser(editedUser);
    setIsEditing(false);
    // Simulate batch save for General tab
    console.log("[PUT] Batch update for General profile:", editedUser);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  // Local state change handler for General tab (Edit Mode)
  const handleUserChange = (field, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillsChange = (type, skills) => {
    if (type === "offered") {
      handleUserChange("skillsOffered", skills);
    } else {
      handleUserChange("skillsWanted", skills);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground animate-pulse">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }

  // Determine which user object to display for General Tab
  const displayUser = isEditing ? editedUser : user;

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <motion.div
            key="general"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              {/* Bio Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">About</h3>
                {isEditing ? (
                  <Textarea
                    value={editedUser.bio}
                    onChange={(e) => handleUserChange("bio", e.target.value)}
                    className="w-full min-h-[120px]"
                    placeholder="Tell the community about yourself..."
                  />
                ) : (
                  <p className="text-muted-foreground leading-relaxed max-w-3xl whitespace-pre-wrap">
                    {user.bio}
                  </p>
                )}
              </div>

              <StatsSection stats={user.stats} />

              <SkillsSection
                offered={displayUser.skillsOffered}
                wanted={displayUser.skillsWanted}
                isEditing={isEditing}
                onUpdateOffered={(skills) =>
                  handleSkillsChange("offered", skills)
                }
                onUpdateWanted={(skills) =>
                  handleSkillsChange("wanted", skills)
                }
              />

              <AchievementsSection achievements={user.achievements} />
            </div>
          </motion.div>
        );
      case "availability":
        return (
          <AvailabilityTab
            key="availability"
            data={user.preferences.availability}
            onUpdate={updateAvailability}
          />
        );
      case "notifications":
        return (
          <NotificationsTab
            key="notifications"
            data={user.preferences.notifications}
            onUpdate={updateNotifications}
          />
        );
      case "privacy":
        return (
          <PrivacyTab
            key="privacy"
            data={user.preferences.privacy}
            onUpdate={updatePrivacy}
          />
        );
      case "settings":
        return (
          <SettingsTab
            key="settings"
            data={user.preferences.settings}
            onUpdate={(data) => updateUser("settings", data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans p-6 md:p-10">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header is always visible at the top */}
        <Header
          user={displayUser}
          showEditButton={activeTab === "general"}
          isEditing={isEditing}
          onEditToggle={handleEditToggle}
          onSave={handleSave}
          onCancel={handleCancel}
          onUserChange={handleUserChange}
        />

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Internal Sidebar / Tabs */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
