// import React, { useState } from "react";
// import { Sidebar } from "../components/Sidebar";
// import { Header } from "../components/Header";
// import { StatsSection } from "../components/StatsSection";
// import { SkillsSection } from "../components/SkillsSection";
// import { AchievementsSection } from "../components/AchievementsSection";
// import { AvailabilityTab } from "../components/AvailabilityTab";
// import { NotificationsTab } from "../components/NotificationsTab";
// import { PrivacyTab } from "../components/PrivacyTab";
// import { SettingsTab } from "../components/SettingsTab";
// import { Textarea } from "../components/ui/Primitives";
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
// import { motion, AnimatePresence } from "framer-motion";

const MOCK_USER = {
  id: "u1",
  name: "Alex Rivera",
  handle: "@arivera_design",
  location: "San Francisco, CA",
  avatarUrl: "https://picsum.photos/200/200",
  bio: "Product Designer passionate about accessibility and design systems. Looking to improve my React & Node.js skills.",
  stats: {
    swapsCompleted: 42,
    responseRate: 98,
    memberSince: "March 2023",
    rating: 4.9,
  },
  skillsOffered: [
    { id: "1", name: "UI/UX Design", level: "Expert", category: "Design" },
    { id: "2", name: "Figma", level: "Expert", category: "Design" },
    {
      id: "3",
      name: "Brand Strategy",
      level: "Intermediate",
      category: "Marketing",
    },
    {
      id: "4",
      name: "Illustration",
      level: "Intermediate",
      category: "Design",
    },
  ],
  skillsWanted: [
    { id: "5", name: "React.js", level: "Beginner", category: "Development" },
    { id: "6", name: "TypeScript", level: "Beginner", category: "Development" },
    { id: "7", name: "SEO", level: "Intermediate", category: "Marketing" },
  ],
  achievements: [
    {
      id: "a1",
      title: "Top Swapper",
      description: "Completed 10 swaps in a single month",
      date: "Aug 2024",
      icon: Zap,
    },
    {
      id: "a2",
      title: "Rising Star",
      description: "Maintained a 5-star rating for 3 months",
      date: "Jul 2024",
      icon: Star,
    },
    {
      id: "a3",
      title: "Community Pillar",
      description: "Active member for over 1 year",
      date: "Mar 2024",
      icon: Award,
    },
  ],
  // New dynamic fields for tabs
  preferences: {
    availability: {
      weekdays: true,
      weekends: false,
      duration: "60",
      mode: "online",
    },
    notifications: {
      message: true,
      swapRequest: true,
      rating: true,
    },
    privacy: {
      publicProfile: true,
      showLocation: true,
      showSkills: true,
    },
    settings: {
      email: "alex.rivera@example.com",
      language: "en",
      twoFactor: false,
    },
  },
};

// const ProfilePage = () => {
//   const [activeTab, setActiveTab] = useState("general");
//   const [user, setUser] = useState(MOCK_USER);
//   const [isEditing, setIsEditing] = useState(false);

//   // Temporary state for editing
//   const [editedUser, setEditedUser] = useState(MOCK_USER);

//   const handleEditToggle = () => {
//     setEditedUser(user);
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     setUser(editedUser);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setEditedUser(user);
//   };

//   const handleUserChange = (field, value) => {
//     setEditedUser((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSkillsChange = (type, skills) => {
//     if (type === "offered") {
//       handleUserChange("skillsOffered", skills);
//     } else {
//       handleUserChange("skillsWanted", skills);
//     }
//   };

//   // Determine which user object to display
//   const displayUser = isEditing ? editedUser : user;

//   const renderContent = () => {
//     switch (activeTab) {
//       case "general":
//         return (
//           <motion.div
//             key="general"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="space-y-6">
//               {/* Bio Section */}
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold mb-2">About</h3>
//                 {isEditing ? (
//                   <Textarea
//                     value={editedUser.bio}
//                     onChange={(e) => handleUserChange("bio", e.target.value)}
//                     className="w-full min-h-[120px]"
//                     placeholder="Tell the community about yourself..."
//                   />
//                 ) : (
//                   <p className="text-muted-foreground leading-relaxed max-w-3xl whitespace-pre-wrap">
//                     {user.bio}
//                   </p>
//                 )}
//               </div>

//               {/* Stats are read-only */}
//               <StatsSection stats={user.stats} />

//               <SkillsSection
//                 offered={displayUser.skillsOffered}
//                 wanted={displayUser.skillsWanted}
//                 isEditing={isEditing}
//                 onUpdateOffered={(skills) =>
//                   handleSkillsChange("offered", skills)
//                 }
//                 onUpdateWanted={(skills) =>
//                   handleSkillsChange("wanted", skills)
//                 }
//               />

//               {/* Achievements are read-only */}
//               <AchievementsSection achievements={user.achievements} />
//             </div>
//           </motion.div>
//         );
//       case "availability":
//         return <AvailabilityTab key="availability" />;
//       case "notifications":
//         return <NotificationsTab key="notifications" />;
//       case "privacy":
//         return <PrivacyTab key="privacy" />;
//       case "settings":
//         return <SettingsTab key="settings" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans p-6 md:p-10">
//       <div className="max-w-7xl mx-auto w-full">
//         {/* Header is always visible at the top */}
//         <Header
//           user={displayUser}
//           showEditButton={activeTab === "general"}
//           isEditing={isEditing}
//           onEditToggle={handleEditToggle}
//           onSave={handleSave}
//           onCancel={handleCancel}
//           onUserChange={handleUserChange}
//         />

//         <div className="flex flex-col md:flex-row gap-8 mt-8">
//           {/* Internal Sidebar / Tabs */}
//           <aside className="w-full md:w-64 flex-shrink-0">
//             <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
//           </aside>

//           {/* Main Content Area */}
//           <main className="flex-1">
//             <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

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

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  // Simulate Database Fetch
  useEffect(() => {
    const fetchData = async () => {
      // Simulate network delay
      try {
        const response = await axios.get("http://localhost:5296/api/User/All", {
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
        });
        const mapped = mapApiUserToMockUser(response.data);
        setUser(mapped);
        setEditedUser(mapped);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const mapApiUserToMockUser = (api) => {
    return {
      id: api.profile.userId,

      name: api.profile.fullName,
      handle: api.email,
      location: api.profile.location,
      avatarUrl: api.profile.profilePhotoUrl,
      bio: api.profile.bio,

      stats: {
        swapsCompleted: 0, // not provided by API
        responseRate: 0, // not provided by API
        memberSince: new Date(api.createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
        rating: api.reputation?.averageRating || 0,
      },

      // Skills Offered (title already exists)
      skillsOffered: api.skills.skillsOffered.map((skill, index) => ({
        id: index.toString(),
        name: skill.title,
        level: skill.level,
        category: skill.category,
        description: skill.description,
        certificateURL: skill.certificateURL,
      })),

      // Skills Wanted (name -> title, NO category)
      skillsWanted: api.skills.skillsWanted.map((skill, index) => ({
        id: index.toString(),
        name: skill.name,
        level: skill.level,
      })),

      achievements: [], // API doesn't provide

      preferences: {
        availability: {
          weekdays: api.availability.availableOnWeekdays,
          weekends: api.availability.availableOnWeekends,
          duration: api.availability.preferredSessionDuration.toString(),
          mode: api.availability.preferredSessionMode,
        },

        notifications: {
          message: api.notifications.notifyOnMessage,
          swapRequest: api.notifications.notifyOnSwapRequest,
          rating: api.notifications.notifyOnRatingReceived,
        },

        privacy: {
          publicProfile: api.privacy.isProfilePublic,
          showLocation: api.privacy.showLocation,
          showSkills: api.privacy.showSkills,
        },

        settings: {
          email: api.email,
          language: "en", // default
          twoFactor: false, // default
        },
      },
    };
  };

  // Simulate PATCH request for specific sections
  const patchUser = async (section, data) => {
    // In a real app, this would be: await api.patch(`/user/${section}`, data);
    console.log(`[PATCH] Updating ${section} with:`, data);

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
              ...data,
            },
          },
        };
      }
      // Handle top-level updates (General tab)
      return { ...prev, ...data };
    });
  };

  const handleEditToggle = () => {
    setEditedUser(user);
    setIsEditing(true);
  };

  const handleSave = () => {
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
            onUpdate={(data) => patchUser("availability", data)}
          />
        );
      case "notifications":
        return (
          <NotificationsTab
            key="notifications"
            data={user.preferences.notifications}
            onUpdate={(data) => patchUser("notifications", data)}
          />
        );
      case "privacy":
        return (
          <PrivacyTab
            key="privacy"
            data={user.preferences.privacy}
            onUpdate={(data) => patchUser("privacy", data)}
          />
        );
      case "settings":
        return (
          <SettingsTab
            key="settings"
            data={user.preferences.settings}
            onUpdate={(data) => patchUser("settings", data)}
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
