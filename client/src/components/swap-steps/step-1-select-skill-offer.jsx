import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";


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
  const navigate = useNavigate();

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
    <div className="p-4 sm:p-6 md:p-8">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Select a Skill to Offer</h2>
      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
        Choose which one of your skills you'd like to trade.
      </p>

      {/* Search */}
      <div className="relative mb-4 sm:mb-6">
        <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
        <Input
          placeholder="Search your skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 sm:pl-12 py-2 sm:py-3 border-gray-200 text-sm sm:text-base"
        />
      </div>

      {/* Skills List */}
      <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
        {filteredSkills?.map((skill) => (
          <button
            key={skill.id}
            onClick={() => handleSelect(skill.title)}
            className={`w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all ${selected === skill.title
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
              }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{skill.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                  {skill.description != null ? skill.description : "No description available"}
                </p>
              </div>
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex-shrink-0 ml-2 sm:ml-4 ${selected === skill.title
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
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        {/*<Button variant="outline" onClick={onClose} className="px-8">
          Cancel
        </Button>*/}
        <Button variant="outline" onClick={() => navigate(-1)} className="w-full sm:w-auto px-6 sm:px-8">
          Cancel
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selected}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
