import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";


const mockSkills = [
  {
    id: "1",
    title: "Digital Marketing Strategy",
    category: "Business",
    description: "Help with social media, SEO, and content planning.",
  },
  {
    id: "2",
    title: "Conversational Spanish",
    category: "Language",
    description: "Beginner to intermediate lessons via video call.",
  },
  {
    id: "3",
    title: "Sourdough Bread Baking",
    category: "Cooking",
    description:
      "Learn the fundamentals of creating and maintaining a starter.",
  },
  {
    id: "4",
    title: "Web Development",
    category: "Technology",
    description: "HTML, CSS, JavaScript, and React fundamentals.",
  },
];

export default function Step1SelectSkillToOffer({ data, onNext, onClose, userData }) {
  const [selected, setSelected] = useState(data?.skillToOffer || null);
  const [search, setSearch] = useState("");

  const filteredSkills = userData.skills?.skillsOffered?.filter(
    (skill) =>
      skill.title.toLowerCase().includes(search.toLowerCase()) ||
      skill.description.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (skillId) => {
    setSelected(skillId);
  };

  const handleNext = () => {
    if (selected) {
      onNext({ skillToOffer: selected });
    }
  };

  return (
    <div className="p-8">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-2">Select a Skill to Offer</h2>
      <p className="text-gray-600 mb-8">
        Choose which one of your skills you'd like to trade.
      </p>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search your skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 py-3 border-gray-200"
        />
      </div>

      {/* Skills List */}
      <div className="space-y-3 mb-8">
        {filteredSkills?.map((skill) => (
          <button
            key={skill.id}
            onClick={() => handleSelect(skill.title)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              selected === skill.title
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{skill.title}</h3>
                <p className="text-sm text-gray-600">
                  {skill.description != null ? skill.description : "No description available"}
                </p>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex-shrink-0 ml-4 ${
                  selected === skill.title
                    ? "border-blue-600 bg-blue-600"
                    : "border-gray-300"
                }`}
              >
                {selected === skill.title && (
                  <svg
                    className="w-full h-full text-white p-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-between">
        <Button variant="outline" onClick={onClose} className="px-8">
          Cancel
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selected}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
