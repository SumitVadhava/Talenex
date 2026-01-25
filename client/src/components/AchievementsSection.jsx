import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Primitives';

export const AchievementsSection = ({ achievements }) => {
  return (
    <Card className="mb-8 overflow-hidden">
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        {achievements.map((item) => (
          <div 
            key={item.id} 
            className="group flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-border hover:bg-secondary/30 transition-all duration-300"
          >
            <div className="p-3 rounded-full bg-gradient-to-br from-yellow-100 to-amber-100 text-amber-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
              <item.icon size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
              <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium pt-1">{item.date}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};