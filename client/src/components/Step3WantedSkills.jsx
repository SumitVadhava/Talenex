import React, { useState } from "react";
import { BookOpen, Pencil, Trash2 } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
// import { Input, Label, Button } from './ui';

export default function Step3WantedSkills({
  formData,
  updateFormData,
  onBack,
  onFinish
}) {
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  const handleAddSkill = () => {
    if (!skillName.trim()) return;

    if (isEditing) {
      // Update existing skill
      updateFormData({
        wantedSkills: formData.wantedSkills.map((s) =>
          s.id === editingId ? { ...s, name: skillName, level: skillLevel } : s
        ),
      });
      setIsEditing(false);
      setEditingId(null);
    } else {
      // Add new skill
      const newSkill = {
        id: Date.now(),
        name: skillName,
        level: skillLevel,
      };
      updateFormData({ wantedSkills: [...formData.wantedSkills, newSkill] });
    }

    setSkillName("");
    setSkillLevel("Beginner");
  };

  const handleDeleteSkill = (id) => {
    updateFormData({
      wantedSkills: formData.wantedSkills.filter((s) => s.id !== id),
    });
  };

  const handleEditSkill = (skill) => {
    setSkillName(skill.name);
    setSkillLevel(skill.level);
    setIsEditing(true);
    setEditingId(skill.id);
  };

  const handleCancelEdit = () => {
    setSkillName("");
    setSkillLevel("Beginner");
    setIsEditing(false);
    setEditingId(null);
  };

  // const handleFinish = () => {
  //   console.log("Full Onboarding Data:", formData);
  //   alert("Setup Complete! Welcome to Telnex.");
  // };

  return (
    <div className="animate-fade-in-up max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
          What do you want to learn?
        </h1>
        <p className="text-zinc-500">
          Add skills you're interested in acquiring. This helps us match you
          with the right mentors.
        </p>
      </div>

      {/* Add Skill Section */}
      <div className="mb-8 space-y-4">
        <Label>{isEditing ? "Edit Skill" : "Skill"}</Label>
        <div className="flex gap-3">
          <Input
            placeholder="e.g. Learn Spanish, Coding in Python, Guitar basics"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
          />
          <Button onClick={handleAddSkill} className="shrink-0 px-6">
            {isEditing ? "Update Skill" : "Add Skill"}
          </Button>
          {isEditing && (
            <Button
              variant="outline"
              onClick={handleCancelEdit}
              className="shrink-0"
            >
              Cancel
            </Button>
          )}
        </div>

        {/* Skill Level Selector */}
        <div className="space-y-2">
          <Label>Desired Level</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {levels.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSkillLevel(level)}
                className={`px-3 py-2 flex justify-center items-center rounded-lg text-sm font-medium border transition-all ${
                  skillLevel === level
                    ? "border-gray-500 bg-gray-100 text-gray-700 ring-1 ring-gray-500"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    skillLevel === level ? "bg-gray-600" : "bg-zinc-300"
                  }`}
                />
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List of Wanted Skills */}
      <div className="space-y-3 mb-12">
        {formData.wantedSkills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-500">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900">{skill.name}</h3>
                <p className="text-sm text-zinc-500">
                  Desired Level: {skill.level}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditSkill(skill)}
                className="text-sm font-medium text-zinc-500 hover:text-indigo-600 px-3 py-1 rounded transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteSkill(skill.id)}
                className="text-sm font-medium text-zinc-500 hover:text-red-500 px-3 py-1 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {formData.wantedSkills.length === 0 && (
          <div className="text-center py-6 text-zinc-400 text-sm">
            No skills added yet.
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-6 border-t border-zinc-100">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-zinc-500 hover:text-zinc-800 transition-colors">
            Skip for now
          </button>
          <Button
            onClick={onFinish}
            className="bg-indigo-600 hover:bg-indigo-700 px-8"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
