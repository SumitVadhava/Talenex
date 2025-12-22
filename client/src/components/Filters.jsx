import React from 'react';
import { Button, Input } from './ui/Common';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

const Filters = ({ filters, setFilters }) => {
  
  const toggleLevel = (level) => {
    setFilters((prev) => {
      const currentLevels = prev.level || [];
      if (currentLevels.includes(level)) {
        return { ...prev, level: currentLevels.filter((l) => l !== level) };
      } else {
        return { ...prev, level: [...currentLevels, level] };
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-2 text-slate-900 font-semibold text-lg">
        <SlidersHorizontal className="w-5 h-5" />
        <h2>Filters</h2>
      </div>

      {/* Search within filters (per request) */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700">Search Skills</label>
        <Input 
          placeholder="Keyword..." 
          icon={<Search className="w-4 h-4" />}
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
        />
      </div>

      {/* Availability */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700">Availability</label>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <Checkbox
              checked={filters.onlyOnline}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({
                  ...prev,
                  onlyOnline: Boolean(checked),
                }))
              }
              className="border-slate-300 data-[state=checked]:bg-slate-600 data-[state=checked]:border-slate-600"
            />
            <span className="text-sm text-slate-600 group-hover:text-slate-900">
              Online Only
            </span>
          </label>
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700">Experience Level</label>
        <div className="flex flex-col gap-2">
    {['Beginner', 'Intermediate', 'Expert'].map((lvl) => (
      <label
        key={lvl}
        htmlFor={lvl}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <Checkbox
          id={lvl}
          checked={filters.level.includes(lvl)}
          onCheckedChange={() => toggleLevel(lvl)}
          className="border-slate-300 data-[state=checked]:bg-slate-600 data-[state=checked]:border-slate-600"
        />
        <span className="text-sm text-slate-600 group-hover:text-slate-900">
          {lvl}
        </span>
      </label>
    ))}
  </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Min Rating</label>
            <span className="text-xs font-medium text-slate-500">{filters.minRating} & up</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="5" 
          step="0.5"
          value={filters.minRating}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              minRating: parseFloat(e.target.value) || 0,
            }))
          }
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
        />
      </div>

       <Button 
         variant="ghost" 
         className="w-full text-slate-500 hover:bg-red-50 hover:text-slate-600"
         onClick={() =>
           setFilters({
             category: 'all',
             search: '',
             onlyOnline: false,
             level: [],
             minRating: 0,
           })
         }
       >
         Reset Filters
       </Button>

    </div>
  );
};

export default Filters;
