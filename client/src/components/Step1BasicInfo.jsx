import React, { useRef } from "react";
import { Camera, ArrowRight } from "lucide-react";
// import { Input, Label, Textarea, Button } from './ui';
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const MAX_BIO_LENGTH = 500;

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
      const url = URL.createObjectURL(file);
      updateFormData({ avatarUrl: url });
    }
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
      <div className="mb-8 flex flex-col items-center justify-center space-y-3">
        <div
          onClick={triggerFileUpload}
          className={`relative h-28 w-28 rounded-full border-4 border-white shadow-lg cursor-pointer flex items-center justify-center overflow-hidden transition-transform hover:scale-105
            ${!formData.avatarUrl ? "bg-zinc-100" : ""}
          `}
        >
          {formData.avatarUrl ? (
            <img
              src={formData.avatarUrl}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-zinc-300">
              <Camera className="w-10 h-10" />
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        <button
          onClick={triggerFileUpload}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          {formData.avatarUrl ? "Change Photo" : "Upload a Photo"}
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        {/* <div className="space-y-1.5">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="e.g. Jane Doe"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div> */}

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
