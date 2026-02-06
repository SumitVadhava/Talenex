import React, { useState, useMemo, useEffect } from "react";
import {
  Star,
  MapPin,
  MessageCircle,
  ArrowLeftRight,
  Calendar,
  CheckCircle2,
  Medal,
  GraduationCap,
  ShieldCheck,
  Handshake,
  Share2,
  ChevronDown,
  ChevronUp,
  Check,
  Award,
  ShieldCheckIcon,
  BadgeCheck,
  StarIcon,
  Trophy,
  FileText,
} from "lucide-react";
import b1 from "../assets/b-1.png";
import b2 from "../assets/b-2.png";
import b3 from "../assets/b-3.png";
import b4 from "../assets/b-4.png";
import b5 from "../assets/b-5.png";
import b6 from "../assets/b-6.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import qs from "qs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

const UserProfilePage = () => {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewSortOption, setReviewSortOption] = useState("newest");
  const navigate = useNavigate();

  const { state } = useLocation();
  const { id } = useParams();
  const [isCopied, setIsCopied] = useState(false);

  const [userData, setUserData] = useState(state?.userData || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("userData : ", userData);
    if (!userData && id) {
      fetchUser();
    }
  }, []);


  // Helper to map API response to component state structure
  const mapApiUserToState = (apiUser) => {
    return {
      id: apiUser?.userId ?? apiUser.email,
      user: {
        id: apiUser.profile?.id ?? apiUser.email,
        email: apiUser.email,
        name: apiUser.profile?.fullName ?? `${apiUser.firstName} ${apiUser.lastName}`,
        avatar: apiUser.profile?.profilePhotoUrl ?? apiUser.imageUrl ?? "",
        location: apiUser.profile?.location ?? "",
        rating: apiUser.reputation?.averageRating ?? 0,
        reviewCount: apiUser.reputation?.totalReviews ?? 0,
        swapsCompleted: apiUser.reputation?.swapsCompleted ?? 0,
      },
      offeredSkills: apiUser.skills?.skillsOffered?.map((skill) => ({
        title: skill.title,
        category: skill.category,
        level: skill.level,
        description: skill.description,
        certificateURL: skill.certificateURL,
      })) || [],
      seekingSkills: apiUser.skills?.skillsWanted?.map((s) => s.name || s.title || s) ?? [],
      isOnline: true,
      postedAt: apiUser.createdAt
        ? new Date(apiUser.createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
        : "",
      reviews: Array.isArray(apiUser.reviews) ? apiUser.reviews.map((review) => ({
        id: review.id,
        reviewerAvatar: review.reviewerAvatar,
        reviewerName: review.reviewerName,
        rating: review.rating,
        reviewMsg: review.reviewMsg,
        createdAt: review.createdAt,
      })) : [],
    };
  };

  const fetchUser = async () => {
    try {
      setLoading(true);

      // Attempt to fetch user by ID
      // Adjust endpoint if necessary based on actual backend route, e.g., /User/${id} or via query
      const response = await api.get(`/User/Details/${id}`, {
        params: {
          include: ["Profile", "Skills", "Reputation", "Reviews"],
        },
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }),
      });

      // Assuming response.data is the user object. 
      // If it's wrapped (e.g. response.data.user), adjust accordingly.
      const mappedUser = mapApiUserToState(response.data);
      setUserData(mappedUser);
    } catch (err) {
      console.error("Error fetching user details:", err);
    } finally {
      setLoading(false);
    }
  };



  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header Skeleton */}
          <Card className="border-none shadow-md overflow-hidden bg-white">
            <Skeleton className="h-32 w-full bg-slate-200" />
            <div className="px-6 md:px-8 pb-6 md:pb-8">
              <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-4 gap-6">
                <Skeleton className="h-32 w-32 rounded-full border-4 border-white bg-slate-200" />
                <div className="flex-1 space-y-3 mt-2 md:mt-0 w-full">
                  <Skeleton className="h-8 w-48 bg-slate-200" />
                  <Skeleton className="h-4 w-32 bg-slate-200" />
                  <Skeleton className="h-6 w-24 rounded-full bg-slate-200" />
                </div>
                <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                  <Skeleton className="h-10 w-28 rounded-md bg-slate-200" />
                  <Skeleton className="h-10 w-32 rounded-md bg-slate-200" />
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats Skeleton */}
            <div className="space-y-6">
              <Card className="shadow-sm border-slate-200">
                <CardHeader className="border-b border-slate-50">
                  <Skeleton className="h-6 w-32 bg-slate-200" />
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-md bg-slate-200" />
                        <Skeleton className="h-4 w-24 bg-slate-200" />
                      </div>
                      <Skeleton className="h-4 w-8 bg-slate-200" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Skills Skeleton */}
            <div className="md:col-span-2 space-y-6">
              <Card className="shadow-sm border-slate-200 h-full">
                <CardHeader className="border-b border-slate-50">
                  <Skeleton className="h-6 w-32 bg-slate-200" />
                </CardHeader>
                <CardContent className="space-y-8 pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-24 bg-slate-200" />
                      <Skeleton className="h-4 w-16 rounded-full bg-slate-200" />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-8 w-24 rounded-md bg-slate-200" />
                      ))}
                    </div>
                  </div>
                  <Separator className="bg-slate-200" />
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-24 bg-slate-200" />
                      <Skeleton className="h-4 w-16 rounded-full bg-slate-200" />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-8 w-24 rounded-md bg-slate-200" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Achievements Skeleton */}
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="border-b border-slate-50">
                <Skeleton className="h-6 w-32 bg-slate-200" />
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center">
                <Skeleton className="h-8 w-48 bg-slate-200" />
              </CardContent>
            </Card>

            {/* Reviews Skeleton */}
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="border-b border-slate-50 flex flex-row justify-between items-center">
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-24 bg-slate-200" />
                  <Skeleton className="h-6 w-12 rounded-full bg-slate-200" />
                </div>
                <Skeleton className="h-8 w-24 rounded-md bg-slate-200" />
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center">
                <Skeleton className="h-8 w-32 bg-slate-200" />
              </CardContent>
            </Card>
          </div>

          {/* Certificates Skeleton */}
          <Card className="shadow-sm border-slate-200 w-full">
            <CardHeader className="border-b border-slate-50">
              <Skeleton className="h-6 w-32 bg-slate-200" />
            </CardHeader>
            <CardContent className="h-32 flex items-center justify-center">
              <Skeleton className="h-8 w-40 bg-slate-200" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const displayedSkills = userData?.offeredSkills || [];
  const hiddenCount = displayedSkills.length - 5;

  // Sort and filter reviews
  const sortedReviews = useMemo(() => {
    if (!userData?.reviews || userData.reviews.length === 0) return [];

    const reviews = [...userData.reviews];

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
  }, [userData?.reviews, reviewSortOption]);

  // Display only top 2 reviews by default
  const displayedReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 2);
  const hasMoreReviews = sortedReviews.length > 2;

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Section */}
        <Card className="border-none shadow-md overflow-hidden bg-white group">
          {/* Creative Modern Background: Dot Pattern */}
          <div className="h-32 bg-slate-50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.4] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <TooltipProvider>
              <Tooltip open={isCopied}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 hover:bg-white/80 backdrop-blur-sm transition-all cursor-pointer"
                    onClick={async () => {
                      const url = `${window.location.origin}/user-details/${userData.id}`;
                      const shareData = {
                        title: `Check out ${userData.user.name}'s profile on Talenex`,
                        text: `View ${userData.user.name}'s skills and achievements on Talenex.`,
                        url: url,
                      };

                      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                        try {
                          await navigator.share(shareData);
                        } catch (err) {
                          if (err.name !== 'AbortError') {
                            console.error('Error sharing:', err);
                            // Fallback to clipboard if share fails
                            navigator.clipboard.writeText(url);
                            setIsCopied(true);
                            setTimeout(() => setIsCopied(false), 2000);
                          }
                        }
                      } else {
                        // Fallback to clipboard
                        navigator.clipboard.writeText(url);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                      }
                    }}
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-green-500 animate-in zoom-in spin-in-90 duration-300" />
                    ) : (
                      <Share2 className="w-4 h-4 transition-all duration-300 transform group-hover:scale-110" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isCopied ? "Copied!" : "Share Profile"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="px-6 md:px-8 pb-6 md:pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-4 gap-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white ring-1 ring-slate-100 bg-white shadow-sm transition-transform duration-300 ease-in-out group-hover:scale-105">
                  <AvatarImage
                    src={userData?.user.avatar}
                    alt={userData?.user.name}
                  />
                  <AvatarFallback>{userData?.user.name}</AvatarFallback>
                </Avatar>
                {/* Subtle status indicator integrated into border */}
                <div
                  className="absolute bottom-2 right-2 h-4 w-4 bg-green-500 border-2 border-white rounded-full shadow-sm"
                  title="Online"
                ></div>
              </div>

              <div className="flex-1 space-y-1 mt-2 md:mt-0 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    {userData?.user.name}
                  </h1>
                </div>

                <div className="flex items-center justify-center md:justify-start text-slate-500 gap-1 text-sm font-medium">
                  <MapPin className="w-4 h-4" />
                  <span>{userData?.user.location}</span>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-2 pt-1">
                  <div className="flex items-center bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-amber-100 transition-colors">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1.5" />
                    Rating :{" "}
                    {userData?.user.rating != 0
                      ? userData?.user.rating
                      : "No Rating"}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                <Button
                  variant="outline"
                  onClick={() => navigate("/messages")}
                  className="flex-1 md:flex-none border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all transform hover:-translate-y-1 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button
                  className="flex-1 md:flex-none bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  onClick={() => navigate("/swap-request", {
                    state: {
                      userData: userData,
                    },
                  })}
                >
                  <ArrowLeftRight className="w-4 h-4 mr-2" />
                  Request Swap
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Stats */}
          <div className="space-y-6">
            <Card className="shadow-sm border-slate-200 overflow-hidden gap-0">
              <CardHeader className="border-b border-slate-50 bg-slate-50/50">
                <CardTitle className="text-base font-bold text-slate-800">
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  {
                    icon: ArrowLeftRight,
                    label: "Swaps Completed",
                    value: userData.user?.totalswapsCompleted || 0,
                    color: "text-blue-600",
                    bg: "bg-blue-100",
                  },
                  {
                    icon: StarIcon,
                    label: "Total Reviews",
                    value: userData.user?.reviewCount || 0,
                    color: "text-yellow-600",
                    bg: "bg-yellow-100",
                  },
                  {
                    icon: Calendar,
                    label: "Member Since",
                    value: userData.postedAt,
                    color: "text-purple-600",
                    bg: "bg-purple-100",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="group flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-all duration-200 cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 ${stat.bg} ${stat.color} rounded-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        <stat.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                        {stat.label}
                      </span>
                    </div>
                    <span className="font-bold text-slate-900">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Skills */}
          <div className="md:col-span-2 space-y-6">
            <Card className="shadow-sm border-slate-200 h-full gap-0">
              <CardHeader className="border-b border-slate-50 bg-slate-50/50">
                <CardTitle className="text-base font-bold text-slate-800">
                  Skills Exchange
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Skills Offered
                    </h4>
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      Total : {userData.offeredSkills?.length}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 animate-in fade-in duration-500">
                    {displayedSkills?.map((skill, i) => (
                      <Badge
                        key={skill.name}
                        variant="secondary"
                        className="rounded-md px-3 py-1.5 text-sm font-medium bg-slate-100 text-slate-700 border border-transparent hover:border-slate-300 hover:bg-white transition-all cursor-default shadow-sm"
                      >
                        {skill.title}
                      </Badge>
                    ))}

                    {/* Interactive Expand Button */}
                    {!showAllSkills && hiddenCount > 0 && (
                      <Badge
                        variant="outline"
                        className="rounded-md px-3 py-1.5 text-sm border-dashed border-slate-300 text-slate-500 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 cursor-pointer transition-all group"
                        onClick={() => setShowAllSkills(true)}
                      >
                        +{hiddenCount} more
                        <ChevronDown className="w-3 h-3 ml-1 group-hover:translate-y-0.5 transition-transform" />
                      </Badge>
                    )}

                    {showAllSkills && (
                      <Badge
                        variant="outline"
                        className="rounded-md px-3 py-1.5 text-sm border-dashed border-slate-300 text-slate-500 hover:text-slate-800 hover:bg-slate-50 cursor-pointer transition-all"
                        onClick={() => setShowAllSkills(false)}
                      >
                        Show Less
                        <ChevronUp className="w-3 h-3 ml-1" />
                      </Badge>
                    )}
                  </div>
                </div>

                <Separator className="bg-slate-200" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Skills Wanted
                    </h4>
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      Total : {userData.seekingSkills?.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {userData.seekingSkills?.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="rounded-md px-3 py-1.5 text-sm font-medium bg-purple-50 text-purple-700 border border-transparent hover:border-purple-200 hover:bg-white hover:shadow-sm transition-all cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Achievements */}
          <Card className="shadow-sm border-slate-200 gap-0">
            <CardHeader className="border-b border-slate-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-slate-800">
                  Achievements
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="h-full">
              {userData.user?.totalSwapsCompleted > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                  {[
                    { threshold: 1, img: b1, label: "1st Swap" },
                    { threshold: 5, img: b2, label: "5 Swaps" },
                    { threshold: 10, img: b3, label: "10 Swaps" },
                    { threshold: 25, img: b4, label: "25 Swaps" },
                    { threshold: 50, img: b5, label: "50 Swaps" },
                    { threshold: 100, img: b6, label: "Knight" },
                  ].map((badge, i) => {
                    const isEarned = userData.user?.totalSwapsCompleted >= badge.threshold;
                    return (
                      <div
                        key={i}
                        className={`flex flex-col items-center text-center gap-2 group transition-all duration-300 ${isEarned ? "opacity-100 scale-100" : "opacity-30 grayscale scale-95"
                          }`}
                      >
                        <div className="relative">
                          <div className={`rounded-2xl flex items-center justify-center transition-all duration-500 ${isEarned ? "group-hover:shadow-xl group-hover:-translate-y-1" : "bg-slate-50 border border-slate-100"
                            }`}>
                            <img
                              src={badge.img}
                              alt={badge.label}
                              className="h-22 w-22 object-contain"
                            />
                          </div>

                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isEarned ? "text-slate-800" : "text-slate-400"
                          }`}>
                          {badge.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center h-full min-h-[150px] space-y-3">
                  <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                    <Trophy className="h-8 w-8 text-slate-200" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-bold text-slate-400">
                      No Achievements Yet
                    </h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                      Complete your first swap to earn a badge!
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reviews & Ratings */}
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
                      {userData.user?.rating?.toFixed(1) || "0.0"}
                    </span>
                    <span className="mx-1 text-amber-300">|</span>
                    <span className="text-xs font-semibold text-amber-600">
                      {userData.user?.reviewCount || 0} reviews
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
                    This user hasn't received any feedback from the any user.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Certificates */}
        <Card className="shadow-sm border-slate-200 gap-0 w-full">
          <CardHeader className="border-b border-slate-50">
            <CardTitle className="text-base font-bold text-slate-800">
              Certificates
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            {userData.offeredSkills?.some((s) => s.certificateURL) ? (
              <div className="space-y-4 pt-4">
                {userData.offeredSkills
                  .filter((s) => s.certificateURL)
                  .map((skill, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                    >
                      <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden border border-slate-200">
                        {skill.certificateURL?.split("?")[0].toLowerCase().endsWith(".pdf") ? (
                          <FileText className="h-6 w-6 text-slate-400" />
                        ) : (
                          <img
                            src={skill.certificateURL}
                            alt={skill.title}
                            className="h-full w-full object-cover select-none pointer-events-none"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {skill.title}
                        </p>
                        <a
                          href={skill.certificateURL}
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
    </div>
  );
};

export default UserProfilePage;
