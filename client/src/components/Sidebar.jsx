import React from "react";
import { cn } from "./ui/Primitives";
import { motion } from "framer-motion";
import {
  User,
  Settings,
  Bell,
  Shield,
  Award,
  Zap,
  Star,
  Calendar,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "General", icon: User, id: "general" },
  { label: "Availability", icon: Calendar, id: "availability" },
  { label: "Notifications", icon: Bell, id: "notifications" },
  { label: "Privacy", icon: Shield, id: "privacy" },
  { label: "Settings", icon: Settings, id: "settings" },
];

export const Sidebar = ({ activeTab, setActiveTab, readOnly }) => {
  const items = readOnly
    ? NAV_ITEMS.filter((item) => item.id !== "settings" && item.id !== "privacy")
    : NAV_ITEMS;

  return (
    <motion.nav
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex flex-col space-y-1"
    >
      {items.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200 group relative cursor-pointer",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <item.icon
              size={18}
              className={cn(
                isActive
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-foreground",
              )}
            />
            {item.label}
          </button>
        );
      })}
    </motion.nav>
  );
};
