import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Switch } from './ui/Primitives';
import { BellRing } from 'lucide-react';
import { motion } from 'framer-motion';

export const NotificationsTab = ({ data, onUpdate }) => {
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
         <h2 className="text-2xl font-bold tracking-tight text-foreground">Notification Preferences</h2>
         <p className="text-muted-foreground mt-1">Control how and when you want to be notified.</p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 text-lg">
             <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <BellRing size={20} />
             </div>
            Alerts & Push Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <label className="text-base font-medium text-foreground">Notify on Message</label>
              <p className="text-sm text-muted-foreground">Receive alerts when you get a new direct message.</p>
            </div>
            <Switch 
              checked={data.message} 
              onCheckedChange={(checked) => handleChange('message', checked)} 
            />
          </div>

          <div className="h-px bg-border/50" />
          
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <label className="text-base font-medium text-foreground">Notify on Swap Request</label>
              <p className="text-sm text-muted-foreground">Get notified when someone proposes a skill swap.</p>
            </div>
            <Switch 
              checked={data.swapRequest} 
              onCheckedChange={(checked) => handleChange('swapRequest', checked)} 
            />
          </div>

          <div className="h-px bg-border/50" />

          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <label className="text-base font-medium text-foreground">Notify on Rating Received</label>
              <p className="text-sm text-muted-foreground">Be alerted when a partner reviews your session.</p>
            </div>
            <Switch 
              checked={data.rating} 
              onCheckedChange={(checked) => handleChange('rating', checked)} 
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};