// import React, { useRef } from "react";
// import { Camera, ArrowRight } from "lucide-react";
// // import { Input, Label, Textarea, Button } from './ui';
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Button } from "./ui/button";
// import { Textarea } from "./ui/textarea";

// const MAX_BIO_LENGTH = 500;

// export default function Step1BasicInfo({ formData, updateFormData, onNext }) {
//   const fileInputRef = useRef(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "bio" && value.length > MAX_BIO_LENGTH) return;
//     updateFormData({ [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];

//     if (file) {
//       const preview = URL.createObjectURL(file);

//       updateFormData({
//         profilePhotoFile: file, // real file
//         profilePhotoUrl: preview, // preview only
//       });
//     }
//   };

//   const triggerFileUpload = () => {
//     fileInputRef.current?.click();
//   };

//   const isFormValid = formData.username && formData.location;

//   return (
//     <div className="animate-fade-in-up max-w-2xl mx-auto">
//       {/* Header */}
//       <div className="mb-8 text-center md:text-left">
//         <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
//           Tell Us About Yourself
//         </h1>
//         <p className="text-zinc-500">
//           Let's start with the basics. You can always change this later.
//         </p>
//       </div>

//       {/* Photo Upload */}
//       <div className="mb-8 flex flex-col items-center justify-center space-y-3">
//         <div
//           onClick={triggerFileUpload}
//           className={`relative h-28 w-28 rounded-full border-4 border-white shadow-lg cursor-pointer flex items-center justify-center overflow-hidden transition-transform hover:scale-105
//             ${!formData.avatarUrl ? "bg-zinc-100" : ""}
//           `}
//         >
//           {formData.profilePhotoUrl ? (
//             <img
//               src={formData.profilePhotoUrl}
//               alt="Profile"
//               className="h-full w-full object-cover"
//             />
//           ) : (
//             <div className="flex flex-col items-center justify-center text-zinc-300">
//               <Camera className="w-10 h-10" />
//             </div>
//           )}
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             accept="image/*"
//             className="hidden"
//           />
//         </div>
//         <button
//           onClick={triggerFileUpload}
//           className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
//         >
//           {formData.profilePhotoUrl  ? "Change Photo" : "Upload a Photo"}
//         </button>
//       </div>

//       {/* Form Fields */}
//       <div className="space-y-5">
//         {/* <div className="space-y-1.5">
//           <Label htmlFor="fullName">Full Name</Label>
//           <Input
//             id="fullName"
//             name="fullName"
//             placeholder="e.g. Jane Doe"
//             value={formData.fullName}
//             onChange={handleInputChange}
//           />
//         </div> */}

//         <div className="space-y-1.5">
//           <Label htmlFor="username">Username</Label>
//           <Input
//             id="username"
//             name="username"
//             placeholder="yourname"
//             prefixText="telnex.com/"
//             value={formData.username}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div className="space-y-1.5">
//           <Label htmlFor="location">Location</Label>
//           <Input
//             id="location"
//             name="location"
//             placeholder="e.g. Rajkot, Gujarat"
//             value={formData.location}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div className="space-y-1.5">
//           <Label htmlFor="bio">Bio</Label>
//           <div className="relative">
//             <Textarea
//               id="bio"
//               name="bio"
//               placeholder="Share a bit about yourself and what you're passionate about."
//               value={formData.bio}
//               onChange={handleInputChange}
//               className="pb-6 min-h-[120px]"
//             />
//             <div className="absolute bottom-2 right-3 text-xs text-zinc-400 font-medium">
//               {formData.bio.length} / {MAX_BIO_LENGTH}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-10 flex justify-end">
//         <Button
//           onClick={() => {
//             onNext();
//             console.log(formData);
//           }}
//           disabled={!isFormValid}
//           className="w-full md:w-auto px-8 py-3 h-12 text-base shadow-indigo-200 cursor-pointer"
//         >
//           Next: Add Your Skills
//           <ArrowRight className="ml-2 w-4 h-4" />
//         </Button>
//       </div>
//     </div>
//   );
// }


import React, { useRef, useState } from "react";
import { Camera, ArrowRight, Upload } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const MAX_BIO_LENGTH = 500;

// Default avatar options
const DEFAULT_AVATARS = [
  "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQMWomTM-eJ2UgFaZtokrqH5SbJYVIbAEYxV8-fwgOXCliTc5SR",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo9XezaHC6SkgsvMNcZ9Z0jiq5t5_-dPvgJuBGrFcvHrSR0bbv",
  "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTFkNVAiHF5YNxE8_gMu9nQpVA3qVILe_Ej0VwOs8LwrzJ4kkTU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPXzM4OrfXW24QujfVo5ehxcmslJKTx5sa7oQj24mPIoiGfmzc",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm6x528Q9oTIZBLQqwe05Fze4Gb0DWmSUcb_D8oup7KkZtKFDD",
  "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTCkvp1YNxOGLQlpCtO16GXT9Db4KHQaY35GGimlvEFL5ftjb8H",
  "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSLPJdObuYRNMyOX_bPSIFa-Ogp-yMUrVV_NlwBDLY3IlCHQEmk",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzrdldSmy_e58vRheIwQV9v-W8ZDjEsbFEgnp5X10QvRBwaAi7",
  "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTkR9i_L0C_fvyYk3rMnD4Sh02nF7PaJMLy3VpupB6WkEwJkVfw",
  "https://img.freepik.com/premium-vector/friendly-smiling-cute-beautiful-girl-cartoon-character-wearing-hat-warm-clothes_7081-5061.jpg",
];

export default function Step1BasicInfo({ formData, updateFormData, onNext }) {
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "bio" && value.length > MAX_BIO_LENGTH) return;
    updateFormData({ [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const preview = URL.createObjectURL(file);

      updateFormData({
        profilePhotoFile: file, // real file
        profilePhotoUrl: preview, // preview only
        isDefaultAvatar: false // mark as custom upload
      });
    }
  };

  const handleAvatarSelect = (avatarUrl) => {
    updateFormData({
      profilePhotoUrl: avatarUrl,
      profilePhotoFile: null, // no file for default avatars
      isDefaultAvatar: true // mark as default avatar
    });
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const isFormValid = formData.username && formData.location;

  return (
    <div className="animate-fade-in-up max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
          Tell Us About Yourself
        </h1>
        <p className="text-zinc-500">
          Let's start with the basics. You can always change this later.
        </p>
      </div>

      {/* Photo Upload */}
      <div className="mb-8 flex flex-col items-center justify-center space-y-4">
        {/* Large Profile Photo Circle */}
        <div
          onClick={triggerFileUpload}
          className={`relative h-28 w-28 rounded-full border-4 border-white shadow-lg cursor-pointer flex items-center justify-center overflow-hidden transition-transform hover:scale-105
            ${!formData.profilePhotoUrl ? "bg-zinc-100" : ""}
          `}
        >
          {formData.profilePhotoUrl ? (
            <img
              src={formData.profilePhotoUrl}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-zinc-300">
              <Camera className="w-10 h-10" />
            </div>
          )}
        </div>

        {/* Avatar Selection Grid */}
        <div className="flex flex-wrap gap-3 justify-center max-w-md">
          {DEFAULT_AVATARS.map((avatar, index) => (
            <div
              key={index}
              onClick={() => handleAvatarSelect(avatar)}
              className={`h-14 w-14 rounded-full border-2 cursor-pointer transition-all hover:scale-110 hover:border-indigo-500
                ${formData.profilePhotoUrl === avatar ? "border-indigo-600 ring-2 ring-indigo-200" : "border-zinc-300"}
              `}
            >
              <img
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          ))}
        </div>

        {/* Upload Custom Photo Button */}
        <button
          onClick={triggerFileUpload}
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          Upload Custom Photo
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="yourname"
            prefixText="telnex.com/"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            placeholder="e.g. Rajkot, Gujarat"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="bio">Bio</Label>
          <div className="relative">
            <Textarea
              id="bio"
              name="bio"
              placeholder="Share a bit about yourself and what you're passionate about."
              value={formData.bio}
              onChange={handleInputChange}
              className="pb-6 min-h-[120px]"
            />
            <div className="absolute bottom-2 right-3 text-xs text-zinc-400 font-medium">
              {formData.bio.length} / {MAX_BIO_LENGTH}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 flex justify-end">
        <Button
          onClick={() => {
            onNext();
            console.log(formData);
          }}
          disabled={!isFormValid}
          className="w-full md:w-auto px-8 py-3 h-12 text-base shadow-indigo-200 cursor-pointer"
        >
          Next: Add Your Skills
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}