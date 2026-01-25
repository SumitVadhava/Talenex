import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Input, Select } from './ui/Primitives';
import { Settings as SettingsIcon, Trash2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDebounce } from '../hooks/useDebounce';

export const SettingsTab = ({ data, onUpdate }) => {
  // Local state for debounced inputs
  const [email, setEmail] = useState(data.email);
  const debouncedEmail = useDebounce(email, 800);

  // Sync prop changes to local state (in case update comes from outside)
  useEffect(() => {
    setEmail(data.email);
  }, [data.email]);

  // Debounce effect for Email
  useEffect(() => {
    if (debouncedEmail !== data.email) {
      onUpdate({ email: debouncedEmail });
    }
  }, [debouncedEmail, data.email, onUpdate]);

  const handleInstantChange = (field, value) => {
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
         <h2 className="text-2xl font-bold tracking-tight text-foreground">Account Settings</h2>
         <p className="text-muted-foreground mt-1">Manage your account information and preferences.</p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 text-lg">
             <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <SettingsIcon size={20} />
             </div>
            General Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3">
            <label className="text-base font-medium text-foreground">Email Address</label>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-md" 
            />
            <p className="text-sm text-muted-foreground">This is the email associated with your account.</p>
          </div>
          
          <div className="h-px bg-border/50" />

          <div className="grid gap-3">
            <label className="text-base font-medium text-foreground">Language</label>
            <Select 
              value={data.language} 
              onChange={(e) => handleInstantChange('language', e.target.value)} 
              className="max-w-md"
            >
              <option value="en">English (US)</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </Select>
            <p className="text-sm text-muted-foreground">Select your preferred language for the interface.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
         <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2.5 text-lg">
               <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <ShieldCheck size={20} />
               </div>
              Security & Authentication
            </CardTitle>
         </CardHeader>
         <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
               <div className="space-y-1.5">
                  <h4 className="text-base font-medium text-foreground">Password</h4>
                  <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
               </div>
               <button className="px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">
                  Change Password
               </button>
            </div>
            
            <div className="h-px bg-border/50" />

            <div className="flex items-center justify-between">
               <div className="space-y-1.5">
                  <h4 className="text-base font-medium text-foreground">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
               </div>
               <button className="px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">
                  Enable 2FA
               </button>
            </div>
         </CardContent>
      </Card>

      <Card className="border-red-100 bg-red-50/30">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 text-lg text-red-700">
             <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <Trash2 size={20} />
             </div>
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <div className="space-y-1.5">
              <p className="text-base font-medium text-foreground">Delete Account</p>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data.</p>
            </div>
            <button className="whitespace-nowrap px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-600 hover:text-white text-sm font-medium rounded-md transition-colors shadow-sm">
              Delete Account
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};