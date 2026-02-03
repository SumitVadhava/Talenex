import React, { useState, useMemo, useEffect, useRef } from "react";
// import { MOCK_SKILLS, CATEGORIES } from './constants';
import SkillCard from "../components/SkillCard";
import Filters from "../components/Filters";
import { Button, Input, Badge } from "../components/ui/Common";
import {
  Bell,
  Menu,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth, useUser } from "@clerk/clerk-react";
import api from "../api/axios";
import qs from "qs";
import Loader from "@/components/Loader";
import { Skeleton } from "@/components/ui/skeleton";

const CATEGORIES = [
  { id: "all", name: "All Skills", icon: "LayoutGrid" },
  { id: "design", name: "UI/UX Design", icon: "Palette" },
  { id: "dev", name: "Python & Web", icon: "Code" },
  { id: "marketing", name: "Marketing", icon: "Megaphone" },
  { id: "music", name: "Music & Audio", icon: "Music" },
  { id: "language", name: "Languages", icon: "Languages" },
  { id: "business", name: "Business", icon: "Briefcase" },
];

// Map category ids to the canonical offerCategory values in MOCK_SKILLS
const CATEGORY_NAME_MAP = {
  all: "All Skills",
  design: "Design",
  dev: "Development",
  marketing: "Marketing",
  music: "Music",
  language: "Languages",
  business: "Business",
};

const MOCK_SKILLS = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "Alice Freeman",
      avatar: "https://picsum.photos/100/100?random=1",
      rating: 4.9, // dummy
      reviewCount: 124, // dummy
    },
    offerTitle: "Advanced UI/UX Design Mentorship",
    offerCategory: "Design",
    offerDescription:
      "I can teach you Figma, auto-layout, and design systems. Looking to improve my backend skills.",
    seekingTitle: "Python or Node.js Tutoring",
    isOnline: true,
    level: "Expert",
    postedAt: "2023-10-25T10:00:00Z",
  },
  {
    id: "2",
    user: {
      id: "u2",
      name: "David Chen",
      avatar: "https://picsum.photos/100/100?random=2",
      rating: 4.7,
      reviewCount: 42,
    },
    offerTitle: "Python Scripting & Automation",
    offerCategory: "Development",
    offerDescription:
      "Automate your boring tasks. I am an expert in Python and Selenium.",
    seekingTitle: "Graphic Design for Logo",
    isOnline: true,
    level: "Expert",
    postedAt: "2023-10-24T14:30:00Z",
  },
  {
    id: "3",
    user: {
      id: "u3",
      name: "Sarah Jones",
      avatar: "https://picsum.photos/100/100?random=3",
      rating: 4.5,
      reviewCount: 15,
    },
    offerTitle: "Social Media Marketing Strategy",
    offerCategory: "Marketing",
    offerDescription:
      "I help brands grow on Instagram and TikTok. Need help with my website.",
    seekingTitle: "React JS Frontend Help",
    isOnline: false,
    level: "Intermediate",
    postedAt: "2023-10-26T09:15:00Z",
  },
  {
    id: "4",
    user: {
      id: "u4",
      name: "Marcus Johnson",
      avatar: "https://picsum.photos/100/100?random=4",
      rating: 5.0,
      reviewCount: 8,
    },
    offerTitle: "Guitar Lessons (Acoustic/Electric)",
    offerCategory: "Music",
    offerDescription: "Been playing for 15 years. Can teach theory and songs.",
    seekingTitle: "Spanish Conversation Practice",
    isOnline: true,
    level: "Expert",
    postedAt: "2023-10-20T11:00:00Z",
  },
  {
    id: "5",
    user: {
      id: "u5",
      name: "Elena Rodriguez",
      avatar: "https://picsum.photos/100/100?random=5",
      rating: 4.8,
      reviewCount: 56,
    },
    offerTitle: "Native Spanish Conversation",
    offerCategory: "Languages",
    offerDescription: "Fun and casual conversation practice.",
    seekingTitle: "Piano Lessons",
    isOnline: true,
    level: "Expert",
    postedAt: "2023-10-22T16:45:00Z",
  },
  {
    id: "6",
    user: {
      id: "u6",
      name: "Tom Baker",
      avatar: "https://picsum.photos/100/100?random=6",
      rating: 4.2,
      reviewCount: 5,
    },
    offerTitle: "SEO Optimization Basics",
    offerCategory: "Marketing",
    offerDescription: "Learn how to rank higher on Google.",
    seekingTitle: "Video Editing (Premiere Pro)",
    isOnline: false,
    level: "Beginner",
    postedAt: "2023-10-26T12:00:00Z",
  },
  {
    id: "7",
    user: {
      id: "u7",
      name: "Jessica Wu",
      avatar: "https://picsum.photos/100/100?random=7",
      rating: 4.6,
      reviewCount: 23,
    },
    offerTitle: "React & Tailwind Development",
    offerCategory: "Development",
    offerDescription:
      "Building modern web apps. I need help writing blog posts.",
    seekingTitle: "Copywriting / Blogging",
    isOnline: true,
    level: "Intermediate",
    postedAt: "2023-10-21T08:20:00Z",
  },
  {
    id: "8",
    user: {
      id: "u8",
      name: "Olaf Jensen",
      avatar: "https://picsum.photos/100/100?random=8",
      rating: 4.9,
      reviewCount: 89,
    },
    offerTitle: "Business Strategy Consulting",
    offerCategory: "Business",
    offerDescription: "MBA graduate helping startups scale.",
    seekingTitle: "Fitness Coaching",
    isOnline: true,
    level: "Expert",
    postedAt: "2023-10-19T18:00:00Z",
  },
];

const Homepage = () => {
  // --- State ---
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  const tokenSentRef = useRef(false);

  const [filters, setFilters] = useState({
    category: "all",
    search: "",
    onlyOnline: false,
    level: [],
    minRating: 0,
  });

  const [sortBy, setSortBy] = useState("oldest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [skills, setSkills] = useState([]);

  // --- Filtering Logic ---
  const filteredData = useMemo(() => {
    return skills.filter((skill) => {
      const currentUserEmail = user?.primaryEmailAddress?.emailAddress;
      if (skill.user.email === currentUserEmail) return false;


      // Category Filter
      if (filters.category !== "all") {
        const canonicalName =
          CATEGORY_NAME_MAP[filters.category] || "All Skills";
        if (
          canonicalName !== "All Skills" &&
          skill.offerCategory !== canonicalName
        ) {
          return false;
        }
      }

      // Search Filter (Offers OR Seeking)
      // Search Filter (Offered Skills OR Wanted Skills)
      if (filters.search) {
        const q = filters.search.toLowerCase();

        const offerMatch = skill.offeredSkills?.some(
          (s) =>
            s.title?.toLowerCase().includes(q) ||
            s.category?.toLowerCase().includes(q),
        );

        const seekMatch = skill.seekingSkills?.some((s) =>
          s?.toLowerCase().includes(q),
        );

        if (!offerMatch && !seekMatch) return false;
      }

      // Online Filter
      if (filters.onlyOnline && !skill.isOnline) return false;

      // Level Filter
      if (filters.level.length > 0 && !filters.level.includes(skill.level))
        return false;

      // Rating Filter
      if (skill.user.rating < filters.minRating) return false;

      return true;
    });
  }, [filters, skills]);

  // --- Sorting Logic ---
  const sortedData = useMemo(() => {
    const data = [...filteredData];
    switch (sortBy) {
      case "rating":
        return data.sort((a, b) => b.user.rating - a.user.rating);
      case "popular":
        return data.sort((a, b) => b.user.reviewCount - a.user.reviewCount);
      case "newest":
        return data.sort(
          (a, b) =>
            new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime(),
        );
      default:
        // Mock date sorting string comparison
        return data.sort(
          (a, b) =>
            new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime(),
        );
    }
  }, [filteredData, sortBy]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const currentItems = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // const mapUsersApiToSkillsList = (users) => {
  //   if (!Array.isArray(users)) return [];

  //   return users.flatMap((user) => {
  //     // ❌ Skip users without skills or offered skills
  //     if (!user.skills?.skillsOffered?.length) return [];

  //     return user.skills.skillsOffered.map((offeredSkill, index) => ({
  //       id: `${user.profile?.userId ?? user.email}-${index}`,

  //       user: {
  //         id: user.profile?.userId ?? user.email,
  //         name:
  //           user.profile?.fullName ??
  //           `${user.firstName} ${user.lastName}`,
  //         avatar:
  //           user.profile?.profilePhotoUrl ??
  //           user.imageUrl ??
  //           "",
  //         rating: user.reputation?.rating ?? 0,
  //         reviewCount: user.reputation?.reviewCount ?? 0,
  //       },

  //       offerTitle: offeredSkill.title,
  //       offerCategory: offeredSkill.category,
  //       offerDescription:
  //         offeredSkill.description || "No description provided",

  //       seekingTitle:
  //         user.skills.skillsWanted?.length > 0
  //           ? `Looking for ${user.skills.skillsWanted
  //             .map((s) => s.name)
  //             .join(", ")}`
  //           : "Open to skill exchange",

  //       isOnline: true,
  //       level: offeredSkill.level,
  //       postedAt: user.createdAt,
  //     }));
  //   });
  // };

  const mapUsersApiToSkillsList = (users) => {
    if (!Array.isArray(users)) return [];

    return users
      .filter((user) => user.skills?.skillsOffered?.length > 0)
      .map((user) => ({
        id: user?.userId ?? user.email,
        user: {
          id: user.profile?.id ?? user.email,
          email: user.email,
          name: user.profile?.fullName ?? `${user.firstName} ${user.lastName}`,
          avatar: user.profile?.profilePhotoUrl ?? user.imageUrl ?? "",
          location: user.profile?.location ?? "",
          rating: user.reputation?.rating ?? 0,
          reviewCount: user.reputation?.reviewCount ?? 0,
        },

        // 🔥 ALL OFFERED SKILLS
        offeredSkills: user.skills.skillsOffered.map((skill) => ({
          title: skill.title,
          category: skill.category,
          level: skill.level,
          description: skill.description,
          certificateURL: skill.certificateURL,
        })),

        // 🔥 ALL WANTED SKILLS
        seekingSkills: user.skills.skillsWanted?.map((s) => s.name) ?? [],

        isOnline: true,
        postedAt: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })
          : "",
      }));
  };

  useEffect(() => {
    // const alreadySent = sessionStorage.getItem("token");
    if (tokenSentRef.current) return;

    tokenSentRef.current = true;

    const init = async () => {
      try {
        const token = await getToken({ template: "customJWT" });

        console.log("Fetched token:", token);

        var response = await api.post(
          "/auth/",
          {}, // body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);


        await getSkills();
      } catch (error) {
        console.error("Error sending token:", error);
      }
    };

    const getSkills = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const response = await api.get("/User/All", {
          params: {
            include: ["Profile", "Skills", "Reputation"],
          },
          paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: "repeat" }),
        });

        console.log("response", response.data);

        const skillsList = mapUsersApiToSkillsList(response.data);
        console.log(skillsList);

        setSkills(skillsList);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // getSkills();
    // console.log(skills);
    // fetchAndSendToken();
    init();
  }, [getToken]);

  const SkeletonCard = () => (
    <div className="flex flex-col gap-4 border border-slate-200 rounded-xl p-6 bg-white shadow-sm h-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full bg-slate-200" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 bg-slate-200" />
            <Skeleton className="h-3 w-24 bg-slate-200" />
          </div>
        </div>
        <Skeleton className="h-6 w-16 px-2 rounded-full bg-slate-200" />
      </div>

      {/* Offer/Seek Section */}
      <div className="space-y-4">
        <div>
          <Skeleton className="h-3 w-32 mb-2 bg-slate-200" />
          <Skeleton className="h-5 w-48 mb-2 bg-slate-200" />
          <Skeleton className="h-4 w-full bg-slate-200" />
          <Skeleton className="h-4 w-3/4 mt-1 bg-slate-200" />
        </div>
        <div className="pt-4 border-t border-slate-100">
          <Skeleton className="h-3 w-32 mb-2 bg-slate-200" />
          <Skeleton className="h-5 w-48 bg-slate-200" />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 flex items-center justify-between">
        <Skeleton className="h-4 w-24 bg-slate-200" />
        <Skeleton className="h-9 w-28 rounded-lg bg-slate-200" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans mt-5">
      {/* --- Main Content --- */}
      <main className="w-full max-w-7xl mx-auto px-4 py-8">
        {/* Hero / Categories */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Find your skill mates
          </h1>
          <p className="text-slate-500 mb-6">
            Give a skill. Gain a skill. Grow together.
          </p>

          <div className="flex items-center gap-3 overflow-x-auto pb-4 hide-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setFilters({ ...filters, category: cat.id });
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all cursor-pointer ${filters.category === cat.id
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- Sidebar (Filters) --- */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-white p-6 shadow-2xl transform transition-transform duration-300 ease-in-out lg:static lg:w-64 lg:p-0 lg:shadow-none lg:bg-transparent lg:translate-x-0 ${mobileFilterOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <span className="font-bold text-lg">Filters</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileFilterOpen(false)}
              >
                Close
              </Button>
            </div>
            <div className="lg:sticky lg:top-24">
              <Filters filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          {/* Mobile Filter Toggle Overlay */}
          {mobileFilterOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileFilterOpen(false)}
            ></div>
          )}

          {/* --- Grid Section --- */}
          <div className="flex-1">
            {/* Toolbar (Search + Sort + Mobile Filter Trigger) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setMobileFilterOpen(true)}
                >
                  <Filter className="w-4 h-4 mr-2" /> Filters
                </Button>
                <div className="relative w-full sm:w-80">
                  <Input
                    placeholder="Search python, design..."
                    icon={<Search className="w-4 h-4" />}
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                    className="bg-slate-50 border-transparent focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-sm text-slate-500 hidden sm:inline">
                  Sort by:
                </span>
                <div className="relative group min-w-[175px]">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full bg-transparent pl-3 pr-8 py-2 text-sm font-medium text-slate-900 border-none shadow-none focus:ring-0">
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent className="z-50">
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      {/*<SelectItem value="popular">Most Popular</SelectItem>*/}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
                {Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : currentItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                {currentItems.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">
                  No skills found
                </h3>
                <p className="text-slate-500 max-w-xs mx-auto mt-2">
                  Try adjusting your filters or search for something else.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() =>
                    setFilters({
                      category: "All",
                      search: "",
                      onlyOnline: false,
                      level: [],
                      minRating: 0,
                    })
                  }
                >
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {currentItems.length > 0 && (
              <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">
                <span className="text-sm text-slate-500">
                  Showing{" "}
                  <span className="font-medium text-slate-900">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-slate-900">
                    {Math.min(currentPage * itemsPerPage, sortedData.length)}
                  </span>{" "}
                  of {sortedData.length} results
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${currentPage === i + 1
                        ? "bg-primary-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;