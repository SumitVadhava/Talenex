import React, { useState } from "react";
import {
  ArrowRight,
  Plus,
  Trash2,
  Pencil,
  UploadCloud,
  Code,
  PenTool,
  Music,
  Globe,
  X,
  File,
} from "lucide-react";
// import { Input, Label, Select, Textarea, Button } from './ui';
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Step2Skills({
  formData,
  updateFormData,
  onNext,
  onBack,
}) {
  const fileInputRef = React.useRef(null);
  
  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "",
    level: "Intermediate",
    description: "",
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const categories = [
    { value: "development", label: "Development" },
    { value: "design", label: "Design" },
    { value: "music", label: "Music" },
    { value: "language", label: "Language" },
    { value: "business", label: "Business" },
  ];

  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  const validate = () => {
    const errs = {};
    if (!newSkill.name.trim()) errs.name = "Skill name is required";
    if (!newSkill.category) errs.category = "Category is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddSkill = () => {
    if (!validate()) return;

    if (isEditing) {
      // Update existing skill
      updateFormData({
        offeredSkills: formData.offeredSkills.map((s) =>
          s.id === editingId ? { ...newSkill, id: editingId } : s
        ),
      });
      setIsEditing(false);
      setEditingId(null);
    } else {
      // Add new skill
      const skill = { ...newSkill, id: Date.now() };
      updateFormData({ offeredSkills: [...formData.offeredSkills, skill] });
    }

    setNewSkill({
      name: "",
      category: "",
      level: "Intermediate",
      description: "",
      file: null,
    });

    setErrors({});
  };

  const handleEditSkill = (skill) => {
    setNewSkill(skill);
    setIsEditing(true);
    setEditingId(skill.id);
    setErrors({});
  };

  const handleCancelEdit = () => {
    setNewSkill({
      name: "",
      category: "",
      level: "Intermediate",
      description: "",
      file: null,
    });
    setIsEditing(false);
    setEditingId(null);
    setErrors({});
  };

  const handleDeleteSkill = (id) => {
    updateFormData({
      offeredSkills: formData.offeredSkills.filter((s) => s.id !== id),
    });
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "development":
        return <Code className="w-5 h-5" />;
      case "design":
        return <PenTool className="w-5 h-5" />;
      case "music":
        return <Music className="w-5 h-5" />;
      case "language":
        return <Globe className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  const validateFile = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/svg+xml", "image/png", "image/jpeg", "application/pdf"];
    
    if (file.size > maxSize) {
      setErrors(prev => ({ ...prev, file: "File size must be less than 5MB" }));
      return false;
    }
    
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, file: "Only SVG, PNG, JPG, and PDF files are allowed" }));
      return false;
    }
    
    return true;
  };

  const handleFileSelect = (file) => {
    if (validateFile(file)) {
      setNewSkill({ ...newSkill, file });
      setErrors(prev => {
        const { file: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    setNewSkill({ ...newSkill, file: null });
    setErrors(prev => {
      const { file: _, ...rest } = prev;
      return rest;
    });
  };

  return (
    <div className="animate-fade-in-up max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
          What Skills Can You Offer?
        </h1>
        <p className="text-zinc-500">
          Add the skills you're proficient in and willing to teach or exchange
          with others.
        </p>
      </div>

      {/* Add Skill Card */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-zinc-900 mb-4">
          {isEditing ? "Edit Skill" : "Add a New Skill"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-1.5">
            <Label>Skill Name</Label>
            <Input
              placeholder="e.g. Python Programming"
              value={newSkill.name}
              onChange={(e) =>
                setNewSkill({ ...newSkill, name: e.target.value })
              }
              error={errors.name}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Skill Category</Label>
            <Select
              value={newSkill.category}
              onValueChange={(value) =>
                setNewSkill({ ...newSkill, category: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select skill category" />
              </SelectTrigger>
              <SelectContent>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Level */}
        <div className="mb-4 space-y-1.5">
          <Label>Proficiency Level</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {levels.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setNewSkill({ ...newSkill, level })}
                className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium border transition-all
                  ${
                    newSkill.level === level
                      ? "border-gray-500 bg-gray-100 text-gray-700 ring-1 ring-gray-500"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    newSkill.level === level ? "bg-gray-600" : "bg-zinc-300"
                  }`}
                />
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4 space-y-1.5">
          <Label>Experience Description</Label>
          <Textarea
            placeholder="Briefly describe your experience..."
            value={newSkill.description}
            onChange={(e) =>
              setNewSkill({ ...newSkill, description: e.target.value })
            }
            className="min-h-[80px]"
          />
        </div>

        {/* Upload */}
        <div className="mb-6 space-y-1.5">
          <Label>Certifications or Portfolio (Optional)</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".svg,.png,.jpg,.jpeg,.pdf"
            onChange={handleFileInput}
            className="hidden"
          />
          {newSkill.file ? (
            <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                  <File className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900">
                    {newSkill.file.name}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {(newSkill.file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-1 text-green-600 hover:text-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef?.click()}
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                dragActive
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-zinc-200 hover:bg-zinc-50"
              }`}
            >
              <UploadCloud
                className={`w-8 h-8 mb-2 ${
                  dragActive ? "text-indigo-500" : "text-zinc-400"
                }`}
              />
              <p className="text-sm font-medium text-zinc-600">
                Click to upload{" "}
                <span className="text-zinc-400 font-normal">
                  or drag and drop
                </span>
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                SVG, PNG, JPG or PDF (MAX. 5MB)
              </p>
            </div>
          )}
          {errors.file && (
            <p className="text-xs text-red-500 mt-1">{errors.file}</p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          {isEditing && (
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
          )}
          <Button onClick={handleAddSkill}>
            {isEditing ? <></> : <Plus className="w-4 h-4 mr-2" />}

            {isEditing ? "Update Skill" : "Add Skill"}
          </Button>
        </div>
      </div>

      {/* Added Skills */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900">
          Your Offered Skills
        </h2>

        {formData.offeredSkills.length === 0 ? (
          <div className="text-center py-8 bg-zinc-50 rounded-lg border border-zinc-100 text-zinc-400">
            No skills added yet. Add your first skill above.
          </div>
        ) : (
          <div className="space-y-3">
            {formData.offeredSkills.map((skill) => (
              <div
                key={skill.id}
                className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex items-start justify-between group hover:border-indigo-200 transition-colors"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {skill.level} • {skill.category}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditSkill(skill)}
                    className="p-2 text-zinc-400 hover:text-indigo-600 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-10 flex justify-between items-center">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>

        <Button onClick={onNext} className="bg-indigo-600 hover:bg-indigo-700">
          Next: Skills Wanted
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
