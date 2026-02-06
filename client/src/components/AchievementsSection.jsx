import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Trophy } from 'lucide-react';
import b1 from "../assets/b-1.png";
import b2 from "../assets/b-2.png";
import b3 from "../assets/b-3.png";
import b4 from "../assets/b-4.png";
import b5 from "../assets/b-5.png";
import b6 from "../assets/b-6.png";

export const AchievementsSection = ({ achievements, swapsCompleted }) => {
  const badgeConfig = (achievements && achievements.length > 0) ? achievements : [
    { threshold: 1, img: b1, label: "1st Swap" },
    { threshold: 5, img: b2, label: "5 Swaps" },
    { threshold: 10, img: b3, label: "10 Swaps" },
    { threshold: 25, img: b4, label: "25 Swaps" },
    { threshold: 50, img: b5, label: "50 Swaps" },
    { threshold: 100, img: b6, label: "Knight" },
  ];

  return (
    <Card className="overflow-hidden shadow-sm border-slate-200 h-full">
      <CardHeader className="border-b border-slate-50">
        <CardTitle className="text-base font-bold text-slate-800">Achievements</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        {swapsCompleted > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
            {badgeConfig.map((badge, i) => {
              const isEarned = swapsCompleted >= badge.threshold;
              return (
                <div
                  key={i}
                  className={`flex flex-col items-center text-center gap-2 group transition-all duration-300 ${isEarned ? "opacity-100 scale-100" : "opacity-30 grayscale scale-95"
                    }`}
                >
                  <div className="relative">
                    <div className={`rounded-2xl flex items-center justify-center transition-all duration-500 ${isEarned ? "group-hover:shadow-xl group-hover:-translate-y-1" : "bg-slate-50 border border-slate-100"
                      }`}>
                      <img
                        src={badge.img}
                        alt={badge.label}
                        className="h-22 w-22 object-contain"
                      />
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isEarned ? "text-slate-800" : "text-slate-400"
                    }`}>
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full min-h-[150px] space-y-3 py-6">
            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
              <Trophy className="h-8 w-8 text-slate-200" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-bold text-slate-400">
                No Achievements Yet
              </h3>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                Complete your first swap to earn a badge!
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};