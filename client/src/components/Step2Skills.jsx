import React, { useRef, useState } from "react";
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
  Award,
  Building2,
  Shapes,
  Terminal,
  Briefcase,
  Lightbulb,
  ListPlus,
  Info,
} from "lucide-react";
// import { Input, Label, Select, Textarea, Button } from './ui';
import { notification } from "antd";
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
  const fileInputRef = useRef(null);

  const [newSkill, setNewSkill] = useState({
    title: "",
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
    { value: "Programming Language", label: "Programming Language" },
    { value: "design", label: "Design" },
    { value: "music", label: "Music" },
    { value: "language", label: "Language" },
    { value: "business", label: "Business" },
    { value: "Other", label: "Other" },
  ];

  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  const validate = () => {
    const errs = {};
    if (!newSkill.title?.trim()) errs.title = "Skill name is required";
    if (!newSkill.category) errs.category = "Category is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddSkill = () => {
    if (!validate()) return;

    if (newSkill.title.includes(",") || newSkill.title.includes(" ")) {
      notification.error({ message: "Add the skill one by one" });
      return;
    }

    if (isEditing) {
      // Update existing skill
      updateFormData({
        offeredSkills: formData.offeredSkills.map((s) =>
          s.id === editingId ? { ...newSkill, id: editingId } : s,
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
      title: "",
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
      title: "",
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

  const handleNext = () => {
    if (formData.offeredSkills.length === 0) {
      notification.warning({ message: "Please add at least one offered skill to proceed." });
      return;
    }
    onNext();
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "development":
        return <Code className="w-5 h-5" />;
      case "business":
        return <Briefcase className="w-5 h-5" />;
      case "design":
        return <PenTool className="w-5 h-5" />;
      case "music":
        return <Music className="w-5 h-5" />;
      case "language":
        return <Globe className="w-5 h-5" />;
      case "Programming Language":
        return <Terminal className="w-5 h-5" />;
      case "Other":
        return <Shapes className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  const validateFile = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = [
      "image/svg+xml",
      "image/png",
      "image/jpeg",
      "application/pdf",
    ];

    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        file: "File size must be less than 5MB",
      }));
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        file: "Only SVG, PNG, JPG, and PDF files are allowed",
      }));
      return false;
    }

    return true;
  };

  const handleFileSelect = (file) => {
    if (validateFile(file)) {
      setNewSkill({ ...newSkill, file });
      setErrors((prev) => {
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
    setErrors((prev) => {
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
        <p className="text-zinc-500 mb-3">
          Add the skills you're proficient in and willing to teach or exchange
          with others.
        </p>
        <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex gap-2 sm:gap-3">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-gray-700">
              <span className="font-semibold text-blue-900">Note:</span> Add skills individually to keep your profile structured.
            </p>
          </div>
        </div>
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
              value={newSkill.title}
              maxLength={40}
              onChange={(e) => {
                setNewSkill({ ...newSkill, title: e.target.value });
                if (errors.title) {
                  setErrors((prev) => {
                    const { title: _, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              className={
                errors.title
                  ? "border-red-500 focus-visible:border-red-500"
                  : ""
              }
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">{errors.title}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Skill Category</Label>
            <Select
              value={newSkill.category}
              onValueChange={(value) => {
                setNewSkill({ ...newSkill, category: value });
                if (errors.category) {
                  setErrors((prev) => {
                    const { category: _, ...rest } = prev;
                    return rest;
                  });
                }
              }}
            >
              <SelectTrigger
                className={`w-full cursor-pointer ${errors.category ? "border-red-500" : ""}`}
              >
              <SelectValue placeholder="Select skill category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value} className="cursor-pointer">
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-xs text-red-500 mt-1 ">{errors.category}</p>
            )}
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
                className={`flex items-center justify-center px-3 py-2 cursor-pointer rounded-lg text-sm font-medium border transition-all
                  ${newSkill.level === level
                    ? "border-gray-500 bg-gray-100 text-gray-700 ring-1 ring-gray-500"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${newSkill.level === level ? "bg-gray-600" : "bg-zinc-300"
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
            maxLength={200}
            onChange={(e) =>
              setNewSkill({ ...newSkill, description: e.target.value })
            }
            className="min-h-[80px]"
          />
        </div>

        {/* Upload */}
        <div className="mb-6 space-y-1.5">
          <Label>Certifications (Optional)</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".svg,.png,.jpg,.jpeg,.pdf"
            onChange={handleFileInput}
            className="hidden"
          />
          {newSkill.file ? (
            <div className="border-2 border-slate-200 bg-slate-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-stale-600">
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
                className="p-1 text-slate-600 hover:text-red-500 transition-colors"
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
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${dragActive
                ? "border-indigo-500 bg-indigo-50"
                : "border-zinc-200 hover:bg-zinc-50"
                }`}
            >
              <UploadCloud
                className={`w-8 h-8 mb-2 ${dragActive ? "text-indigo-500" : "text-zinc-400"
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
            <Button
              variant="outline"
              onClick={handleCancelEdit}
              className="cursor-pointer"
            >
              Cancel
            </Button>
          )}
          <Button onClick={handleAddSkill} className="cursor-pointer">
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
            {/* {formData.offeredSkills.map((skill) => (
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
                      {skill.title}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {skill.level} • {skill.category}
                    </p>


                  </div>
                </div>
                {skill.file && (
                  <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-md w-fit">
                    <File className="w-3 h-3" />
                    Certificate Available
                  </span>
                )}

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">

                  <button
                    onClick={() => handleEditSkill(skill)}
                    className="p-2 text-zinc-400 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="p-2 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))} */}
            {formData.offeredSkills.map((skill) => (
              <div
                key={skill.id}
                className="group bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md border-indigo-200 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    {/* Category Icon with a soft gradient or solid subtle background */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-50 text-indigo-600 transition-colors">
                      {getCategoryIcon(skill.category)}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-zinc-900 tracking-tight">
                          {skill.title}
                        </h3>

                        {/* Elegant Certificate Badge */}
                        {skill.file && (
                          <div
                            className="flex items-center gap-1.5 px-2 py-[2px] rounded-md 
                          bg-amber-50 border border-amber-100 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                          >
                            <Award className="w-3.5 h-3.5 text-amber-500" />
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-600">
                              Certificate
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <span>{skill.level}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-300" />
                        <span className="text-zinc-400">{skill.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - subtle and clean */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <button
                      onClick={() => handleEditSkill(skill)}
                      className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-10 flex justify-between items-center">
        <Button variant="secondary" onClick={onBack} className="cursor-pointer">
          Back
        </Button>

        <Button
          onClick={handleNext}
          className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
        >
          Next: Skills Wanted
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
