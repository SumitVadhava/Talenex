import React, { useRef, useState } from "react";
import { MapPin, Share2, Check, X, Loader2, Camera, Pencil, PencilIcon, PencilOffIcon, Crown } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { Input } from "./ui/Primitives";
import ImageCropper from "./ImageCropper";
import { DEFAULT_AVATARS } from "../constants/avatars";

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
  const [imageToCrop, setImageToCrop] = useState(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
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
          navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      }
    } else {
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
  // Handle file change (OPEN CROPPER)
  // -------------------------------
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result);
        setIsCropperOpen(true);
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    }
  };

  // -------------------------------
  // Handle crop completion
  // -------------------------------
  const handleCropComplete = async (croppedBlob) => {
    setUploading(true);
    try {
      const file = new File([croppedBlob], "profile-photo.jpg", { type: "image/jpeg" });
      const uploadResult = await uploadToCloudinary(file);
      onUserChange?.("avatarUrl", uploadResult.secure_url);
    } catch (error) {
      console.error("Avatar upload failed:", error);
      alert("Failed to upload profile photo");
    } finally {
      setUploading(false);
    }
  };

  // -------------------------------
  // Handle avatar selection from grid
  // -------------------------------
  const handleAvatarSelect = (avatarUrl) => {
    onUserChange?.("avatarUrl", avatarUrl);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white flex flex-col md:flex-row gap-6 items-start md:items-center pb-8 border-b border-border mb-8"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Profile Image Circle */}
        <div
          className={`relative h-24 w-24 md:h-28 md:w-28 rounded-full overflow-hidden ring-4 ring-background shadow-lg bg-secondary ${isEditing ? "cursor-pointer group" : "cursor-default"
            }`}
          onClick={() => isEditing && fileInputRef.current?.click()}
        >
          <img
            src={user?.avatarUrl}
            alt={user?.name}
            className={`h-full w-full object-cover transition-transform duration-500 ${isEditing ? "group-hover:scale-110" : ""
              }`}
          />
          {isEditing && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8 text-white" />
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
        </div>

        {/* Avatar Grid (Edit Mode Only) */}
        {isEditing && (
          <div className="flex flex-wrap gap-2 justify-center max-w-[200px]">
            {DEFAULT_AVATARS.map((avatar, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAvatarSelect(avatar);
                }}
                className={`h-8 w-8 rounded-full border-2 transition-all hover:scale-110 overflow-hidden ${user?.avatarUrl === avatar ? "border-indigo-600 ring-2 ring-indigo-100" : "border-zinc-200"
                  }`}
              >
                <img src={avatar} alt={`Avatar ${index}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex-1 space-y-2 w-full max-w-2xl">
        <div>
          {isEditing ? (
            <div className="space-y-2 mb-2">
              <Input
                value={user?.name}
                onChange={(e) => onUserChange?.("name", e.target.value)}
                className="text-xl md:text-2xl font-bold h-12"
                placeholder="Your Name"
              />
              <p className="text-muted-foreground font-medium px-3 py-2">
                {user?.handle}
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight flex items-center gap-2">
                {user?.name}
                {user?.isPremium && (
                  <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-300 rounded-full text-amber-700 text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider select-none ml-1 transform translate-y-[2px]">
                    <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    PRO
                  </div>
                )}
              </h2>
              <p className="text-muted-foreground font-medium ">{user?.handle}</p>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground items-center">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <MapPin size={16} className="shrink-0" />
            {isEditing ? (
              <Input
                value={user?.location}
                onChange={(e) => onUserChange?.("location", e.target.value)}
                className="h-8 max-w-[200px]"
                placeholder="City, Country"
              />
            ) : (
              <span>{user?.location}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-4 md:mt-0 w-full md:w-auto">
        {showEditButton && (
          isEditing ? (
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={onCancel}
                disabled={uploading || isSaving}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent h-10 px-4 py-2 cursor-pointer disabled:opacity-50"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={onSave}
                disabled={uploading || isSaving}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          ) : (
            <button
              onClick={onEditToggle}
              className="flex-1 md:flex-none inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent h-10 px-4 py-2 cursor-pointer"
            >
              <PencilIcon size={16} className="mr-2" />
              Edit Profile
            </button>
          )
        )}

        {!isEditing && showShareButton && (
          <button
            onClick={handleShare}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer"
          >
            {copied ? <Check size={16} /> : <Share2 size={16} />}
            {copied ? "Copied" : "Share"}
          </button>
        )}
      </div>

      <ImageCropper
        image={imageToCrop}
        open={isCropperOpen}
        onOpenChange={setIsCropperOpen}
        onCropComplete={handleCropComplete}
      />
    </motion.div>
  );
};
