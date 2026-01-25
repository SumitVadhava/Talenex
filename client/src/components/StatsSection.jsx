import React from 'react';
import { Card, CardContent } from './ui/Primitives';
import { RefreshCcw, MessageCircle, Calendar, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const StatsSection = ({ stats }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const statItems = [
    {
      label: 'Swaps Completed',
      value: stats.swapsCompleted,
      icon: RefreshCcw,
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      label: 'Response Rate',
      value: `${stats.responseRate}%`,
      icon: MessageCircle,
      color: 'text-green-500',
      bg: 'bg-green-50'
    },
    {
      label: 'Rating',
      value: stats.rating,
      icon: Star,
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    },
    {
      label: 'Member Since',
      value: stats.memberSince,
      icon: Calendar,
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    }
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
    >
      {statItems.map((stat, idx) => (
        <motion.div key={idx} variants={item}>
          <Card className="hover:shadow-md transition-shadow duration-300 border-border/60">
            <CardContent className="p-5 flex flex-col items-center text-center justify-center space-y-3">
              <div className={`p-3 rounded-full ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight text-foreground">{stat.value}</div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mt-1">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};