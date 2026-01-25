import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, Input } from './ui/Primitives';
import { ArrowRightLeft, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SkillsSection = ({ 
  offered, 
  wanted, 
  isEditing = false,
  onUpdateOffered,
  onUpdateWanted
}) => {

  const handleRemove = (id, type) => {
    if (type === 'offered' && onUpdateOffered) {
      onUpdateOffered(offered.filter(s => s.id !== id));
    } else if (type === 'wanted' && onUpdateWanted) {
      onUpdateWanted(wanted.filter(s => s.id !== id));
    }
  };

  const AddSkillForm = ({ type }) => {
    const [name, setName] = useState('');
    const [level, setLevel] = useState('Beginner');

    const handleAdd = () => {
      if (!name.trim()) return;
      const newSkill = {
        id: Math.random().toString(36).substr(2, 9),
        name: name.trim(),
        level,
        category: 'General'
      };
      
      if (type === 'offered' && onUpdateOffered) {
        onUpdateOffered([...offered, newSkill]);
      } else if (type === 'wanted' && onUpdateWanted) {
        onUpdateWanted([...wanted, newSkill]);
      }
      setName('');
    };

    return (
      <div className="flex gap-2 mt-4 items-center">
        <Input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New Skill..."
          className="h-8 text-sm"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <select 
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermed.</option>
          <option value="Expert">Expert</option>
        </select>
        <button 
          onClick={handleAdd}
          disabled={!name.trim()}
          className="h-8 w-8 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          <Plus size={16} />
        </button>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* Offered Skills */}
      <Card className="h-full border-l-4 border-l-emerald-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            Skills Offered
          </CardTitle>
          <p className="text-sm text-muted-foreground">Expertise you can teach or trade.</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {offered.map((skill) => (
                <motion.div 
                  key={skill.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge variant="secondary" className="pl-3 pr-2 py-1.5 text-sm bg-emerald-50 text-emerald-700 border-emerald-100 flex items-center gap-2">
                      <span>
                        {skill.name}
                        <span className="ml-1 opacity-60 text-xs font-normal">| {skill.level}</span>
                      </span>
                      {isEditing && (
                        <button 
                          onClick={() => handleRemove(skill.id, 'offered')}
                          className="hover:bg-emerald-200 rounded-full p-0.5 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      )}
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {isEditing && <AddSkillForm type="offered" />}
        </CardContent>
      </Card>

      {/* Wanted Skills */}
      <Card className="h-full border-l-4 border-l-pink-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-pink-500" />
            Skills Wanted
          </CardTitle>
           <p className="text-sm text-muted-foreground">Skills you are interested in learning.</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {wanted.map((skill) => (
                <motion.div 
                  key={skill.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge variant="secondary" className="pl-3 pr-2 py-1.5 text-sm bg-pink-50 text-pink-700 border-pink-100 flex items-center gap-2">
                      <span>
                        {skill.name}
                        <span className="ml-1 opacity-60 text-xs font-normal">| {skill.level}</span>
                      </span>
                      {isEditing && (
                        <button 
                          onClick={() => handleRemove(skill.id, 'wanted')}
                          className="hover:bg-pink-200 rounded-full p-0.5 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      )}
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {isEditing ? (
             <AddSkillForm type="wanted" />
          ) : (
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
               <ArrowRightLeft size={16} />
               <span>Looking for a swap? <a href="#" className="text-primary hover:underline font-medium">Propose a trade</a></span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};