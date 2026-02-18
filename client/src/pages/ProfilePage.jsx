import {
  User,
  Settings,
  Bell,
  Shield,
  Award,
  Zap,
  Star,
  Calendar,
  ChevronDown,
  ChevronUp,
  Trophy,
} from "lucide-react";
import b1 from "../assets/b-1.png";
import b2 from "../assets/b-2.png";
import b3 from "../assets/b-3.png";
import b4 from "../assets/b-4.png";
import b5 from "../assets/b-5.png";
import b6 from "../assets/b-6.png";
import React, { useState, useEffect, useMemo } from "react";
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
import { RateUsTab } from "../components/RateUsTab";
import { Textarea } from "../components/ui/Primitives";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import qs from "qs";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { user: clerkUser } = useUser();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const { id } = useParams();
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

  // Reviews state
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewSortOption, setReviewSortOption] = useState("newest");

  // Simulate Database Fetch
  useEffect(() => {
    if (id) {
      fetchData(id);
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async (userId) => {
    // Simulate network delay
    try {
      const response = await api.get(
        "/User/Details" + (userId ? "/" + userId : ""),
        {
          params: {
            include: [
              "Profile",
              "Skills",
              "Availability",
              "Privacy",
              "Reputation",
              "Notifications",
              "Reviews",
            ],
          },
          paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: "repeat" }),
        },
      );
      // console.log(response.data);
      // console.log("Fetched user data:", response.data);

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
      id: api?.userId || api.id,

      name: api.profile?.fullName || "", // --
      handle: api.email || "", // -- |
      location: api.profile?.location || "", // --
      avatarUrl: api.profile?.profilePhotoUrl || "",
      bio: api.profile?.bio || "", // --
      username: api.profile?.username,
      longitude: api.profile?.longitude,
      latitude: api.profile?.latitude,

      stats: {
        totalSwapsCompleted: api.reputation?.totalSwapsCompleted || 0,
        totalReviews: api.reputation?.totalReviews,
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

      achievements: [
        { threshold: 1, img: b1, label: "1st Swap" },
        { threshold: 5, img: b2, label: "5 Swaps" },
        { threshold: 10, img: b3, label: "10 Swaps" },
        { threshold: 25, img: b4, label: "25 Swaps" },
        { threshold: 50, img: b5, label: "50 Swaps" },
        { threshold: 100, img: b6, label: "Knight" },
      ],

      reviews: Array.isArray(api.reviews) ? api.reviews.map((review) => ({
        id: review.id,
        reviewerAvatar: review.reviewerAvatar,
        reviewerName: review.reviewerName,
        rating: review.rating,
        reviewMsg: review.reviewMsg,
        createdAt: review.createdAt,
      })) : [],

      certificates: api.skills?.skillsOffered?.filter((s) => s.certificateURL).map((skill, index) => ({
        id: index.toString(),
        title: skill.title,
        certificateURL: skill.certificateURL,
      })) || [],

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
      await api.put(
        `/${mappingSection[section]}/${id}`,
        payload,
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
    await api.put(
      `/UserSkills/${id}`,
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

    // console.log("profile payload", payload);

    if (!id) {
      console.log(`No ID found for section: profile`);
      return;
    }

    await api.put(
      `/UserProfile/${id}`,
      payload,
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

  const [isSaving, setIsSaving] = useState(false);

  const handleEditToggle = () => {
    setEditedUser(user);
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await Promise.all([updateProfile(), updateSkills()]);

      setUser(editedUser);
      setIsEditing(false);
      // Simulate batch save for General tab
      // console.log("[PUT] Batch update for General profile:", editedUser);
    } finally {
      setIsSaving(false);
    }
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

  // Sort and filter reviews
  const sortedReviews = useMemo(() => {
    if (!user?.reviews || user.reviews.length === 0) return [];

    const reviews = [...user.reviews];

    switch (reviewSortOption) {
      case "newest":
        return reviews.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA; // Most recent first
        });
      case "highest":
        return reviews.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return reviews.sort((a, b) => a.rating - b.rating);
      default:
        return reviews;
    }
  }, [user?.reviews, reviewSortOption]);

  // Display only top 2 reviews by default
  const displayedReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 2);
  const hasMoreReviews = sortedReviews.length > 2;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
  const isReadOnly = !!id;

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

              {/* Achievements & Reviews side-by-side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="space-y-6">
                  <AchievementsSection
                    achievements={user.achievements}
                    swapsCompleted={user.stats.totalSwapsCompleted}
                  />
                </div>
                {/* Reviews & Ratings Section */}
                <Card className="shadow-sm border-slate-200 gap-0">
                  <CardHeader className="border-b border-slate-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg font-bold text-slate-800">
                          Reviews
                        </CardTitle>
                        <div className="flex items-center bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1.5" />
                          <span className="text-sm font-bold text-amber-700">
                            {user.stats?.rating?.toFixed(1) || "0.0"}
                          </span>
                          <span className="mx-1 text-amber-300">|</span>
                          <span className="text-xs font-semibold text-amber-600">
                            {sortedReviews.length || 0} reviews
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <select
                          value={reviewSortOption}
                          onChange={(e) => setReviewSortOption(e.target.value)}
                          className="appearance-none bg-slate-50 hover:bg-slate-100 transition-colors border-none rounded-md py-1.5 pl-3 pr-8 text-xs font-semibold text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer"
                        >
                          <option value="newest">Sort: Newest</option>
                          <option value="highest">Highest Rated</option>
                          <option value="lowest">Lowest Rated</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                          <ChevronDown className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-0 p-0">
                    {sortedReviews && sortedReviews.length > 0 ? (
                      <>
                        <div className={`divide-y divide-slate-100 ${showAllReviews ? 'max-h-[500px] overflow-y-auto' : ''}`}>
                          {displayedReviews.map((review, i) => (
                            <div
                              key={review.id || i}
                              className="group p-6 hover:bg-slate-50/50 transition-all duration-300"
                            >
                              <div className="flex gap-4">
                                <Avatar className="h-12 w-12 border-2 border-white shadow-sm ring-1 ring-slate-100 shrink-0">
                                  <AvatarImage src={review.reviewerAvatar} />
                                  <AvatarFallback className="bg-slate-100 font-bold text-slate-400">
                                    {review.reviewerName?.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>

                                <div className="flex-1 space-y-2">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h5 className="text-sm font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                                        {review.reviewerName}
                                      </h5>
                                      <div className="flex text-amber-400 mt-0.5">
                                        {[...Array(5)].map((_, j) => (
                                          <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'fill-current' : 'text-slate-200'}`} />
                                        ))}
                                      </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white px-2 py-1 rounded-md border border-slate-100 shadow-sm">
                                      {review.createdAt && review.createdAt !== "0001-01-01T00:00:00"
                                        ? new Date(review.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                                        : "Recently"}
                                    </span>
                                  </div>

                                  <p className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50/50 group-hover:bg-white p-3 rounded-lg border border-transparent group-hover:border-slate-100 transition-all">
                                    "{review.reviewMsg}"
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Show More/Less Button */}
                        {hasMoreReviews && (
                          <div className="p-4 border-t border-slate-100 bg-slate-50/30">
                            <Button
                              variant="ghost"
                              onClick={() => setShowAllReviews(!showAllReviews)}
                              className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50 font-semibold transition-all"
                            >
                              {showAllReviews ? (
                                <>
                                  <ChevronUp className="w-4 h-4 mr-2" />
                                  Show Less Reviews
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-4 h-4 mr-2" />
                                  Show All {sortedReviews.length} Reviews
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col justify-center items-center py-16 px-6">
                        <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                          <Star className="h-8 w-8 text-slate-200" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">
                          No Reviews Yet
                        </h3>
                        <p className="text-sm text-slate-500 text-center max-w-[200px] mt-2">
                          You haven't received any feedback yet.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Certificates Section (Full Width Below) */}
              <Card className="shadow-sm border-slate-200 gap-0 w-full mt-6">
                <CardHeader className="border-b border-slate-50">
                  <CardTitle className="text-base font-bold text-slate-800">
                    Certificates
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-full">
                  {user.certificates && user.certificates.length > 0 ? (
                    <div className="space-y-4 pt-4">
                      {user.certificates.map((cert, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                        >
                          <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden border border-slate-200">
                            <img
                              src={cert.certificateURL}
                              alt={cert.title}
                              className="h-full w-full object-cover select-none pointer-events-none"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-slate-900 truncate">
                              {cert.title}
                            </p>
                            <a
                              href={cert.certificateURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                            >
                              View Certificate
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-full min-h-[100px]">
                      <h1 className="text-xl font-semibold text-gray-300">
                        No Certificates
                      </h1>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        );
      case "availability":
        return (
          <AvailabilityTab
            key="availability"
            data={user.preferences.availability}
            onUpdate={updateAvailability}
            readOnly={isReadOnly}
          />
        );
      case "notifications":
        return (
          <NotificationsTab
            key="notifications"
            data={user.preferences.notifications}
            onUpdate={updateNotifications}
            readOnly={isReadOnly}
          />
        );
      case "privacy":
        return (
          <PrivacyTab
            key="privacy"
            data={user.preferences.privacy}
            onUpdate={updatePrivacy}
            readOnly={isReadOnly}
          />
        );
      case "rate-us":
        return <RateUsTab key="rate-us" />;
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
          showEditButton={activeTab === "general" && !isReadOnly}
          showShareButton={!isReadOnly}
          isEditing={isEditing}
          isSaving={isSaving}
          onEditToggle={handleEditToggle}
          onSave={handleSave}
          onCancel={handleCancel}
          onUserChange={handleUserChange}
        />

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Internal Sidebar / Tabs */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              readOnly={isReadOnly}
            />
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
