import React, { useState } from 'react';
import { MapPin, Mail, Link as LinkIcon, Share2, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from './ui/Primitives';

export const Header = ({ 
  user, 
  showEditButton = true,
  isEditing = false,
  onEditToggle,
  onSave,
  onCancel,
  onUserChange
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white flex flex-col md:flex-row gap-6 items-start md:items-center pb-8 border-b border-border mb-8"
    >
      <div className="relative group">
        <div className="h-24 w-24 md:h-28 md:w-28 rounded-full overflow-hidden ring-4 ring-background shadow-lg bg-secondary">
          <img 
            src={user.avatarUrl} 
            alt={user.name} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <h1>{user.avatarUrl}</h1>
        </div>
        <div className="absolute bottom-1 right-1 h-5 w-5 bg-green-500 border-4 border-white rounded-full" title="Online" />
      </div>

      <div className="flex-1 space-y-2 w-full max-w-2xl">
        <div>
          {isEditing ? (
            <div className="space-y-2 mb-2">
              <Input 
                value={user.name} 
                onChange={(e) => onUserChange?.('name', e.target.value)}
                className="text-xl md:text-2xl font-bold h-12"
                placeholder="Your Name"
              />
              <Input 
                value={user.handle} 
                onChange={(e) => onUserChange?.('handle', e.target.value)}
                className="text-muted-foreground font-medium h-9 w-fit"
                placeholder="@handle"
              />
            </div>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{user.name}</h2>
              <p className="text-muted-foreground font-medium">{user.handle}</p>
            </>
          )}
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground items-center">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <MapPin size={16} className="shrink-0" />
            {isEditing ? (
              <Input 
                value={user.location} 
                onChange={(e) => onUserChange?.('location', e.target.value)}
                className="h-8 max-w-[200px]"
                placeholder="City, Country"
              />
            ) : (
              <span>{user.location}</span>
            )}
          </div>
          {!isEditing && (
            <>
              <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                <Mail size={16} />
                <span>Contact</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                <LinkIcon size={16} />
                <span>Portfolio</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-4 md:mt-0 w-full md:w-auto">
        {showEditButton && (
          isEditing ? (
             <div className="flex gap-2 w-full md:w-auto">
                <button 
                  onClick={onCancel}
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 shadow-sm"
                >
                  <X size={16} /> Cancel
                </button>
                <button 
                  onClick={onSave}
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 shadow-sm"
                >
                  <Check size={16} /> Save
                </button>
             </div>
          ) : (
            <button 
              onClick={onEditToggle}
              className="flex-1 md:flex-none inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 shadow-sm"
            >
              Edit Profile
            </button>
          )
        )}
        
        {!isEditing && (
          <button 
            onClick={handleShare}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 shadow-sm"
          >
            {copied ? <Check size={16} /> : <Share2 size={16} />}
            {copied ? 'Copied' : 'Share'}
          </button>
        )}
      </div>
    </motion.div>
  );
};