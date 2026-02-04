import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Switch } from './ui/Primitives';
import { Eye, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export const PrivacyTab = ({ data, onUpdate, readOnly }) => {
  const handleChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Privacy & Visibility</h2>
        <p className="text-muted-foreground mt-1">Manage who can see your profile and details.</p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 text-lg">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              {data.publicProfile ? <Eye size={20} /> : <Lock size={20} />}
            </div>
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <label className="text-base font-medium text-foreground">Public Profile</label>
              <p className="text-sm text-muted-foreground">Allow anyone to view your profile without logging in.</p>
            </div>
            <Switch
              disabled={readOnly}
              checked={data.publicProfile}
              onCheckedChange={(checked) => handleChange('publicProfile', checked)}
            />
          </div>

          <div className="h-px bg-border/50" />

          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <label className="text-base font-medium text-foreground">Show Location</label>
              <p className="text-sm text-muted-foreground">Display your city and country on your profile.</p>
            </div>
            <Switch
              disabled={readOnly}
              checked={data.showLocation}
              onCheckedChange={(checked) => handleChange('showLocation', checked)}
            />
          </div>

          <div className="h-px bg-border/50" />

          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <label className="text-base font-medium text-foreground">Show Skills</label>
              <p className="text-sm text-muted-foreground">Make your offered and wanted skills visible.</p>
            </div>
            <Switch
              disabled={readOnly}
              checked={data.showSkills}
              onCheckedChange={(checked) => handleChange('showSkills', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};