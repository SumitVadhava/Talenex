import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Switch, Select } from './ui/Primitives';
import { Clock, Calendar, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AvailabilityTab = ({ data, onUpdate, readOnly }) => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const handleChange = (field, value) => {
    
    if (!value) {
      const otherField = field === 'weekdays' ? 'weekends' : 'weekdays';
      if (!data[otherField]) {
        setToast('You must be available on at least one — weekdays or weekends.');
        return;
      }
    }
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
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Availability Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your schedule and preferences for skill swaps.</p>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            key="avail-toast"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex items-start gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 shadow-sm"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
            <p className="text-sm font-medium flex-1">{toast}</p>
            <button
              onClick={() => setToast(null)}
              className="flex-shrink-0 text-amber-400 hover:text-amber-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 text-lg">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Calendar size={20} />
            </div>
            Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <label className="text-base font-medium text-foreground">Available on Weekdays</label>
              <p className="text-sm text-muted-foreground">Monday - Friday</p>
            </div>
            <Switch
              disabled={readOnly}
              checked={data.weekdays}
              onCheckedChange={(checked) => handleChange('weekdays', checked)}
            />
          </div>

          <div className="h-px bg-border/50" />

          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <label className="text-base font-medium text-foreground">Available on Weekends</label>
              <p className="text-sm text-muted-foreground">Saturday & Sunday</p>
            </div>
            <Switch
              disabled={readOnly}
              checked={data.weekends}
              onCheckedChange={(checked) => handleChange('weekends', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 text-lg">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Clock size={20} />
            </div>
            Session Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3">
            <label className="text-base font-medium text-foreground">Preferred Session Duration</label>
            <Select
              disabled={readOnly}
              value={data.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              className="max-w-md"
            >
              <option value="30">30 Minutes</option>
              <option value="45">45 Minutes</option>
              <option value="60">1 Hour</option>
              <option value="90">1.5 Hours</option>
            </Select>
            <p className="text-sm text-muted-foreground">Average length of time you can commit to a single session.</p>
          </div>

          <div className="h-px bg-border/50" />

          <div className="grid gap-3">
            <label className="text-base font-medium text-foreground">Preferred Session Mode</label>
            <Select
              disabled={readOnly}
              value={data.mode}
              onChange={(e) => handleChange('mode', e.target.value)}
              className="max-w-md"
            >
              <option value="online">Online (Video Call)</option>
              <option value="offline">In-Person</option>
              <option value="hybrid">Both Online & In-Person</option>
            </Select>
            <p className="text-sm text-muted-foreground">Choose how you prefer to connect with others.</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};