// import React, { useState } from 'react';
// import { MapPin, Mail, Link as LinkIcon, Share2, Check, X } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Input } from './ui/Primitives';

// export const Header = ({ 
//   user, 
//   showEditButton = true,
//   isEditing = false,
//   onEditToggle,
//   onSave,
//   onCancel,
//   onUserChange
// }) => {
//   const [copied, setCopied] = useState(false);

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white flex flex-col md:flex-row gap-6 items-start md:items-center pb-8 border-b border-border mb-8"
//     >
//       <div className="relative group">
//         <div className="h-24 w-24 md:h-28 md:w-28 rounded-full overflow-hidden ring-4 ring-background shadow-lg bg-secondary">
//           <img 
//             src={user.avatarUrl} 
//             alt={user.name} 
//             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//           />
//           <h1>{user.avatarUrl}</h1>
//         </div>
//         <div className="absolute bottom-1 right-1 h-5 w-5 bg-green-500 border-4 border-white rounded-full" title="Online" />
//       </div>

//       <div className="flex-1 space-y-2 w-full max-w-2xl">
//         <div>
//           {isEditing ? (
//             <div className="space-y-2 mb-2">
//               <Input 
//                 value={user.name} 
//                 onChange={(e) => onUserChange?.('name', e.target.value)}
//                 className="text-xl md:text-2xl font-bold h-12"
//                 placeholder="Your Name"
//               />
//               <Input 
//                 value={user.handle} 
//                 onChange={(e) => onUserChange?.('handle', e.target.value)}
//                 className="text-muted-foreground font-medium h-9 w-fit"
//                 placeholder="@handle"
//               />
//             </div>
//           ) : (
//             <>
//               <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{user.name}</h2>
//               <p className="text-muted-foreground font-medium">{user.handle}</p>
//             </>
//           )}
//         </div>

//         <div className="flex flex-wrap gap-4 text-sm text-muted-foreground items-center">
//           <div className="flex items-center gap-1.5 w-full sm:w-auto">
//             <MapPin size={16} className="shrink-0" />
//             {isEditing ? (
//               <Input 
//                 value={user.location} 
//                 onChange={(e) => onUserChange?.('location', e.target.value)}
//                 className="h-8 max-w-[200px]"
//                 placeholder="City, Country"
//               />
//             ) : (
//               <span>{user.location}</span>
//             )}
//           </div>
//           {!isEditing && (
//            <>
//   <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
//     <Mail size={16} />
//     <span>Contact</span>
//   </div>
//   <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
//     <LinkIcon size={16} />
//     <span>Portfolio</span>
//   </div>
// </> 
//           )}
//         </div>
//       </div>

//       <div className="flex gap-3 mt-4 md:mt-0 w-full md:w-auto">
//         {showEditButton && (
//           isEditing ? (
//              <div className="flex gap-2 w-full md:w-auto">
//                 <button 
//                   onClick={onCancel}
//                   className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 shadow-sm"
//                 >
//                   <X size={16} /> Cancel
//                 </button>
//                 <button 
//                   onClick={onSave}
//                   className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 shadow-sm"
//                 >
//                   <Check size={16} /> Save
//                 </button>
//              </div>
//           ) : (
//             <button 
//               onClick={onEditToggle}
//               className="flex-1 md:flex-none inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 shadow-sm"
//             >
//               Edit Profile
//             </button>
//           )
//         )}

//         {!isEditing && (
//           <button 
//             onClick={handleShare}
//             className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 shadow-sm"
//           >
//             {copied ? <Check size={16} /> : <Share2 size={16} />}
//             {copied ? 'Copied' : 'Share'}
//           </button>
//         )}
//       </div>
//     </motion.div>
//   );
// };



import React, { useRef, useState } from "react";
import { MapPin, Share2, Check, X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { Input } from "./ui/Primitives";

export const Header = ({
  user,
  showEditButton = true,
  isEditing = false,
  isSaving = false,
  onEditToggle,
  onSave,
  onCancel,
  onUserChange,
  showShareButton = true
}) => {
  const [copied, setCopied] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // -------------------------------
  // Share profile link
  // -------------------------------
  const handleShare = async () => {
    const url = `${window.location.origin}/user-profile/${user.id}`;
    const shareData = {
      title: `Check out ${user.name}'s profile on Talenex`,
      text: `View ${user.name}'s skills and profile on Talenex.`,
      url: url,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error sharing:", err);
          // Fallback to clipboard if share fails
          navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // -------------------------------
  // Upload image to Cloudinary
  // -------------------------------
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Certificates");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dpwes05hc/image/upload",
      formData,
    );


    return res.data;
  };

  // -------------------------------
  // Handle avatar change (EDIT MODE ONLY)
  // -------------------------------
  const handleAvatarChange = async (e) => {
    if (!isEditing) return;

    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      // 1️⃣ Upload to Cloudinary
      const uploadResult = await uploadToCloudinary(file);
      const imageUrl = uploadResult.secure_url;

      // 2️⃣ Update UI immediately
      onUserChange?.("avatarUrl", imageUrl);

      // 3️⃣ Update backend DB
      // await api.put(
      //   "/user/avatar",
      //   { avatarUrl: imageUrl }
      // );
    } catch (error) {
      console.error("Avatar upload failed:", error);
      alert("Failed to upload profile photo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white flex flex-col md:flex-row gap-6 items-start md:items-center pb-8 border-b border-border mb-8"
    >
      {/* Avatar */}
      <div
        className={`relative group p-1 ml-4 mt-4 ${isEditing ? "cursor-pointer" : "cursor-default"
          }`}
        onClick={() => {
          if (isEditing) {
            fileInputRef.current.click();
          }
        }}
      >
        <div className="h-24 w-24 md:h-28 md:w-28 rounded-full overflow-hidden ring-4 ring-background shadow-lg bg-secondary">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className={`h-full w-full object-cover transition-transform duration-500 ${isEditing ? "group-hover:scale-110" : ""
              }`}
          />
        </div>

        {/* Overlay – ONLY in edit mode */}
        {isEditing && (
          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-medium transition">
            {uploading ? "Uploading..." : "Change Photo"}
          </div>
        )}

        {/* File input – ONLY in edit mode */}
        {isEditing && (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        )}
      </div>

      {/* User Info */}
      <div className="flex-1 space-y-2 w-full max-w-2xl">
        <div>
          {isEditing ? (
            <div className="space-y-2 mb-2">
              <Input
                value={user.name}
                onChange={(e) => onUserChange?.("name", e.target.value)}
                className="text-xl md:text-2xl font-bold h-12"
                placeholder="Your Name"
              />
              <p className="text-muted-foreground font-medium px-3 py-2">
                {user.handle}
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                {user.name}
              </h2>
              <p className="text-muted-foreground font-medium">
                {user.handle}
              </p>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground items-center">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <MapPin size={16} className="shrink-0" />
            {isEditing ? (
              <Input
                value={user.location}
                onChange={(e) => onUserChange?.("location", e.target.value)}
                className="h-8 max-w-[200px]"
                placeholder="City, Country"
              />
            ) : (
              <span>{user.location}</span>
            )}
          </div>
        </div>
      </div>

      {/* Buttons (UNCHANGED) */}
      <div className="flex gap-3 mt-4 md:mt-0 w-full md:w-auto">
        {showEditButton && (
          isEditing ? (
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={onCancel}
                disabled={uploading || isSaving}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={onSave}
                disabled={uploading || isSaving}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Check size={16} />
                )}
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          ) : (
            <button
              onClick={onEditToggle}
              className="flex-1 md:flex-none inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 shadow-sm cursor-pointer"
            >
              Edit Profile
            </button>
          )
        )}

        {!isEditing && showShareButton && (
          <button
            onClick={handleShare}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 shadow-sm cursor-pointer"
          >
            {copied ? <Check size={16} /> : <Share2 size={16} />}
            {copied ? "Copied" : "Share"}
          </button>
        )}
      </div>
    </motion.div>
  );
};
