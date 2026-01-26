import React from "react";
import { Badge, Button, Card } from "./ui/Common";
import { Star, MessageCircle, Globe, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SkillCard = ({ skill }) => {
  const navigate = useNavigate();

  const handleSwapClick = () => {
    navigate("/user-details", {
      state: { userData: skill },
    });
  };

  return (
    <Card className="group flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1 hover:-translate-x-1 border-slate-200 hover:border-primary-200 bg-white overflow-hidden">
      {/* User Header */}
      <div className="p-4 flex justify-between items-start border-b border-slate-50 bg-slate-50/30">
        <div className="flex gap-3">
          <div className="relative">
            <img
              src={skill.user.avatar}
              alt={skill.user.name}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm"
            />
            {skill.isOnline && (
              <span
                className="absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"
                title="Online"
              />
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-primary-700 transition-colors">
              {skill.user.name}
            </h3>
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-medium text-slate-700">
                {skill.user.rating}
              </span>
              <span className="text-slate-300">•</span>
              <span>{skill.user.reviewCount} reviews</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          {skill.isOnline ? (
            <Badge
              variant="secondary"
              className="bg-green-50 text-green-700 border-green-100 text-[10px] px-2 py-0.5 h-auto font-medium"
            >
              <Globe className="w-3 h-3 mr-1" /> Online
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-slate-500 border-slate-200 text-[10px] px-2 py-0.5 h-auto font-medium bg-white"
            >
              <MapPin className="w-3 h-3 mr-1" /> Local
            </Badge>
          )}
        </div>
      </div>

      {/* Main Content: Offer vs Seek */}
      <div className="p-5 flex-1 flex flex-col gap-4">
        {/* Offering Section */}
        <div className="relative">
          {/* Accent line */}
          <div className="absolute -left-5 top-1 bottom-1 w-1 bg-primary-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div className="flex items-center gap-2 mb-1.5">
            <Badge
              variant="secondary"
              className="bg-slate-100 text-primary-700 hover:bg-slate-200 border-transparent"
            >
              Offering
            </Badge>
          </div>

          <h4 className="font-bold text-slate-900 text-base leading-snug group-hover:text-primary-600 transition-colors">
            {skill.offeredSkills
              .slice(0, 3)
              .map((s) => s.title)
              .join(" • ")}
            {skill.offeredSkills.length > 3 && " • Many More"}
          </h4>

          <p className="text-sm text-slate-500 mt-2 leading-relaxed line-clamp-3">
            {skill.offeredSkills
              .slice(0, 3)
              .map((s) => s.description)
              .filter(Boolean)
              .join(" | ")}
            {skill.offeredSkills.length > 3 && " | Many More"}
          </p>
        </div>

        {/* Seeking Section */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-1">
            Seeking
          </p>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 group-hover:border-primary-100 group-hover:bg-primary-50/20 transition-colors">
            <p className="text-sm font-medium text-slate-700 line-clamp-2">
              {skill.seekingSkills.length > 0
                ? `${skill.seekingSkills.slice(0, 3).join(", ")}${
                    skill.seekingSkills.length > 3 ? " ..." : ""
                  }`
                : "Open to skill exchange"}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 mt-auto border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3 group-hover:bg-white transition-colors">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-700">
            {Array.from(new Set(skill.offeredSkills.map((s) => s.level))).join(
              ", ",
            )}
          </span>
        </div>

        <Button
          size="sm"
          onClick={handleSwapClick}
          className="cursor-pointer shadow-sm bg-slate-900 hover:bg-slate-800 text-white transition-all duration-300 w-auto px-5 group-hover:shadow-md hover:-translate-y-0.5"
        >
          <span className="mr-2">Swap</span>
          <MessageCircle className="w-3.5 h-3.5" />
        </Button>
      </div>
    </Card>
  );
};

export default SkillCard;
