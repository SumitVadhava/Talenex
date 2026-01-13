// import React from 'react';
// import { 
//   MapPin, 
//   Star, 
//   MessageCircle, 
//   Repeat, 
//   Medal, 
//   GraduationCap, 
//   ShieldCheck, 
//   Handshake, 
//   CheckCircle2
// } from 'lucide-react';

// // Assuming standard shadcn/ui imports
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const UserProfilePage = () => {
//   // Mock Data
//   const skillsOffered = [
//     { name: "Graphic Design", count: 12 },
//     { name: "UI/UX Design", count: 8 },
//     { name: "Web Development", count: 7 },
//     { name: "Illustration", count: 5 },
//     { name: "Photography", count: 3 },
//   ];

//   const skillsWanted = [
//     "Creative Writing",
//     "Digital Marketing",
//     "Public Speaking"
//   ];

//   const reviews = [
//     {
//       id: 1,
//       name: "Sarah J.",
//       avatar: "/api/placeholder/32/32",
//       rating: 5,
//       text: "Alex was amazing to swap with! Delivered high-quality designs way ahead of schedule.",
//       date: "2 days ago"
//     },
//     {
//       id: 2,
//       name: "Mike T.",
//       avatar: "/api/placeholder/32/32",
//       rating: 5,
//       text: "Super responsive and professional. The web dev tips were exactly what I needed.",
//       date: "1 week ago"
//     }
//   ];

//   const achievements = [
//     { icon: <Medal className="h-6 w-6 text-yellow-500" />, label: "First Swap", color: "bg-yellow-50" },
//     { icon: <GraduationCap className="h-6 w-6 text-blue-500" />, label: "Top Teacher", color: "bg-blue-50" },
//     { icon: <ShieldCheck className="h-6 w-6 text-green-500" />, label: "Verified Pro", color: "bg-green-50" },
//     { icon: <Handshake className="h-6 w-6 text-purple-500" />, label: "Community Helper", color: "bg-purple-50" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto space-y-6">

//         {/* --- Header Section --- */}
//         <Card className="border-none shadow-sm">
//           <CardContent className="p-6 md:p-8">
//             <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
//               {/* Avatar */}
//               <div className="relative">
//                 <Avatar className="h-28 w-28 border-4 border-blue-500">
//                   <AvatarImage src="/api/placeholder/150/150" alt="Alex Chen" />
//                   <AvatarFallback className="text-2xl font-bold bg-slate-100">AC</AvatarFallback>
//                 </Avatar>
//                 <div className="absolute bottom-1 right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-white"></div>
//               </div>

//               {/* User Info */}
//               <div className="flex-1 text-center md:text-left space-y-2">
//                 <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
//                   <div>
//                     <h1 className="text-3xl font-bold text-gray-900">Alex Chen</h1>
//                     <div className="flex items-center justify-center md:justify-start text-gray-500 mt-1 gap-1">
//                       <MapPin className="h-4 w-4" />
//                       <span>San Francisco, CA</span>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex gap-3 mt-2 md:mt-0">
//                     <Button variant="outline" className="gap-2">
//                       <MessageCircle className="h-4 w-4" />
//                       Message
//                     </Button>
//                     <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
//                       <Repeat className="h-4 w-4" />
//                       Request Swap
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Trust Score */}
//                 <div className="pt-1 flex justify-center md:justify-start">
//                   <Badge variant="secondary" className="px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100">
//                     Trust Score: 4.8/5 <Star className="h-3 w-3 ml-1 fill-blue-700 text-blue-700" />
//                   </Badge>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

//           {/* --- Left Column: Stats --- */}
//           <div className="md:col-span-4 space-y-6">
//             <Card className="shadow-sm h-full">
//               <CardHeader>
//                 <CardTitle className="text-lg">Stats</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-500">Swaps Completed</span>
//                   <span className="font-semibold text-gray-900">25</span>
//                 </div>
//                 <Separator />
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-500">Response Rate</span>
//                   <span className="font-semibold text-gray-900">95%</span>
//                 </div>
//                 <Separator />
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-500">Member Since</span>
//                   <span className="font-semibold text-gray-900">Jan 2023</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* --- Right Column: Skills --- */}
//           <div className="md:col-span-8 space-y-6">
//             <Card className="shadow-sm h-full">
//               <CardContent className="p-6 space-y-8">
//                 {/* Skills Offered */}
//                 <div>
//                   <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                     Skills Offered
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {skillsOffered.map((skill, index) => (
//                       <Badge 
//                         key={index} 
//                         variant="secondary" 
//                         className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 hover:bg-slate-200"
//                       >
//                         {skill.name} <span className="ml-1.5 opacity-60">[{skill.count}]</span>
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>

//                 <Separator />

//                 {/* Skills Wanted */}
//                 <div>
//                   <h3 className="text-lg font-semibold mb-4 text-gray-900">
//                     Skills Wanted
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {skillsWanted.map((skill, index) => (
//                       <Badge 
//                         key={index} 
//                         variant="outline" 
//                         className="px-3 py-1.5 text-sm border-dashed border-gray-400 text-gray-600"
//                       >
//                         {skill}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* --- Bottom Sections --- */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//           {/* Achievements */}
//           <Card className="shadow-sm">
//             <CardHeader>
//               <CardTitle className="text-lg">Achievements</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                 {achievements.map((item, idx) => (
//                   <div key={idx} className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
//                     <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-3 ${item.color}`}>
//                       {item.icon}
//                     </div>
//                     <span className="text-sm font-medium text-gray-700 leading-tight">
//                       {item.label}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Reviews & Ratings */}
//           <Card className="shadow-sm">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
//               <div className="space-y-1">
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
//                   4.8 <span className="text-gray-500 font-normal text-base">(15 Reviews)</span>
//                 </CardTitle>
//               </div>
//               <Select defaultValue="newest">
//                 <SelectTrigger className="w-[140px] h-8 text-sm">
//                   <SelectValue placeholder="Sort by" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="newest">Newest</SelectItem>
//                   <SelectItem value="highest">Highest Rated</SelectItem>
//                   <SelectItem value="lowest">Lowest Rated</SelectItem>
//                 </SelectContent>
//               </Select>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {reviews.map((review) => (
//                 <div key={review.id} className="bg-gray-50 rounded-lg p-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <div className="flex items-center gap-2">
//                       <Avatar className="h-6 w-6">
//                         <AvatarImage src={review.avatar} />
//                         <AvatarFallback>{review.name[0]}</AvatarFallback>
//                       </Avatar>
//                       <span className="text-sm font-semibold">{review.name}</span>
//                     </div>
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                       ))}
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-600 italic">"{review.text}"</p>
//                 </div>
//               ))}
//               <Button variant="ghost" className="w-full text-sm text-gray-500 hover:text-gray-900 mt-2">
//                 View all reviews
//               </Button>
//             </CardContent>
//           </Card>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default UserProfilePage;



import React, { useState } from 'react';
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
  ChevronUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLocation } from 'react-router-dom';

const UserProfilePage = () => {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const { state } = useLocation();
  const userData = state?.userData;

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>User data not found</p>
      </div>
    );
  }

  const skillsOffered = [
    { name: "Graphic Design", count: 12 },
    { name: "UI/UX Design", count: 8 },
    { name: "Web Development", count: 7 },
    { name: "Illustration", count: 5 },
    { name: "Photography", count: 3 },
    { name: "Video Editing", count: 4 },
    { name: "Branding", count: 6 },
    { name: "Motion Graphics", count: 2 }
  ];

  const displayedSkills = showAllSkills ? skillsOffered : skillsOffered.slice(0, 5);
  const hiddenCount = skillsOffered.length - 5;

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header Section */}
        <Card className="border-none shadow-md overflow-hidden bg-white group">
          {/* Creative Modern Background: Dot Pattern */}
          <div className="h-32 bg-slate-50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.4] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 hover:bg-white/80 backdrop-blur-sm transition-all"
              title="Share Profile"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="px-6 md:px-8 pb-6 md:pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-4 gap-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white ring-1 ring-slate-100 bg-white shadow-sm transition-transform duration-300 ease-in-out group-hover:scale-105">
                  <AvatarImage src="https://picsum.photos/200/200?random=1" alt="Alex Chen" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                {/* Subtle status indicator integrated into border */}
                <div className="absolute bottom-2 right-2 h-4 w-4 bg-green-500 border-2 border-white rounded-full shadow-sm" title="Online"></div>
              </div>

              <div className="flex-1 space-y-1 mt-2 md:mt-0 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Alex Chen</h1>
                </div>

                <div className="flex items-center justify-center md:justify-start text-slate-500 gap-1 text-sm font-medium">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-2 pt-1">
                  <div className="flex items-center bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-amber-100 transition-colors">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1.5" />
                    Trust Score: 4.8/5
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                <Button variant="outline" className="flex-1 md:flex-none border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button className="flex-1 md:flex-none bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-all transform hover:-translate-y-0.5">
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
            <Card className="shadow-sm border-slate-200 overflow-hidden">
              <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/50">
                <CardTitle className="text-base font-bold text-slate-800">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-4">
                {[
                  { icon: ArrowLeftRight, label: "Swaps Completed", value: "25", color: "text-blue-600", bg: "bg-blue-100" },
                  { icon: CheckCircle2, label: "Response Rate", value: "95%", color: "text-green-600", bg: "bg-green-100" },
                  { icon: Calendar, label: "Member Since", value: "Jan 2023", color: "text-purple-600", bg: "bg-purple-100" }
                ].map((stat, i) => (
                  <div key={i} className="group flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-all duration-200 cursor-default">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 ${stat.bg} ${stat.color} rounded-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                        <stat.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{stat.label}</span>
                    </div>
                    <span className="font-bold text-slate-900">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Skills */}
          <div className="md:col-span-2 space-y-6">
            <Card className="shadow-sm border-slate-200 h-full">
              <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/50">
                <CardTitle className="text-base font-bold text-slate-800">Skills Exchange</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 pt-6">
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Skills Offered</h4>
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{skillsOffered.length} Total</span>
                  </div>

                  <div className="flex flex-wrap gap-2 animate-in fade-in duration-500">
                    {displayedSkills.map((skill, i) => (
                      <Badge
                        key={skill.name}
                        variant="secondary"
                        className="rounded-md px-3 py-1.5 text-sm font-medium bg-slate-100 text-slate-700 border border-transparent hover:border-slate-300 hover:bg-white transition-all cursor-default shadow-sm"
                      >
                        {skill.name} <span className="ml-1.5 text-slate-400 font-light text-xs">| {skill.count}</span>
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

                <Separator className="bg-slate-100" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Skills Wanted</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Creative Writing", "Digital Marketing", "Public Speaking"
                    ].map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="rounded-md px-3 py-1.5 text-sm font-medium bg-purple-50 text-purple-700 border border-transparent hover:border-purple-200 hover:bg-white hover:shadow-sm transition-all cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="rounded-md px-3 py-1.5 text-sm border-dashed border-slate-300 text-slate-400 hover:bg-slate-50 cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                      + Add New
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Achievements */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="border-b border-slate-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-slate-800">Achievements</CardTitle>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-purple-600 h-8 text-xs font-medium">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: Medal, label: "First Swap", color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
                  { icon: GraduationCap, label: "Top Teacher", color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" },
                  { icon: ShieldCheck, label: "Verified Pro", color: "text-green-500", bg: "bg-green-50", border: "border-green-100" },
                  { icon: Handshake, label: "Community", label2: "Helper", color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-100" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-3 group cursor-pointer">
                    <div className={`h-16 w-16 rounded-full ${item.bg} border ${item.border} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}>
                      <item.icon className={`w-7 h-7 ${item.color}`} />
                    </div>
                    <span className="text-xs font-semibold text-slate-600 leading-tight group-hover:text-slate-900">
                      {item.label} {item.label2 && <br />}{item.label2}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews & Ratings */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-4 border-b border-slate-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base font-bold text-slate-800">Reviews</CardTitle>
                  <span className="text-sm font-medium text-slate-500 flex items-center bg-slate-100 px-2 py-0.5 rounded-full">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
                    4.8 (15)
                  </span>
                </div>
                <div className="relative">
                  <select className="appearance-none bg-slate-50 hover:bg-slate-100 transition-colors border-none rounded-md py-1.5 pl-3 pr-8 text-xs font-semibold text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer">
                    <option>Sort: Newest</option>
                    <option>Highest Rated</option>
                    <option>Lowest Rated</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {[
                {
                  name: "Sarah M.",
                  avatar: "https://picsum.photos/100/100?random=2",
                  text: "Alex is an amazing designer! He helped me revamp my entire portfolio layout.",
                  date: "2 days ago"
                },
                {
                  name: "David K.",
                  avatar: "https://picsum.photos/100/100?random=3",
                  text: "Great experience swapping photography tips for web dev basics. Very patient.",
                  date: "1 week ago"
                }
              ].map((review, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50/80 transition-all duration-300">
                  <Avatar className="h-10 w-10 border border-slate-200">
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h5 className="text-sm font-bold text-slate-900">{review.name}</h5>
                      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">{review.date}</span>
                    </div>
                    <div className="flex text-amber-400 mb-1.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">"{review.text}"</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs font-semibold text-slate-500 hover:text-purple-600 hover:bg-purple-50 h-9">
                View all 15 reviews
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default UserProfilePage;