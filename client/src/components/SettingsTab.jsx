import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Input, Select } from './ui/Primitives';
import { Settings as SettingsIcon, Trash2, ShieldCheck, AlertTriangle, Crown, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { useDebounce } from '../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useClerk } from "@clerk/clerk-react";

export const SettingsTab = ({ data, onUpdate }) => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const [email, setEmail] = useState(data.email);
  const [premiumPlan, setPremiumPlan] = useState(data.premiumPlan === "Free" ? "Free Tier" : data.premiumPlan);
  const debouncedEmail = useDebounce(email, 800);

  const [isFirstDialogOpen, setIsFirstDialogOpen] = useState(false);
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const CONFIRMATION_STRING = "Delete Account";

  useEffect(() => {
    setEmail(data.email);
  }, [data.email]);

  useEffect(() => {
    if (debouncedEmail !== data.email) {
      onUpdate({ email: debouncedEmail });
    }
  }, [debouncedEmail, data.email, onUpdate]);

  const handleInstantChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  const handleDelete = async () => {
    console.log("handle delete hitted");
    
    setIsDeleting(true);
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        await api.delete(`/User/${userId}`);
        localStorage.clear();
        await signOut();
        navigate('/');
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
    } finally {
      setIsDeleting(false);
      setIsSecondDialogOpen(false);
      setConfirmationText("");
    }
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
              disabled
              className="max-w-md"
            />
            <p className="text-sm text-muted-foreground">This is the email associated with your account.</p>
          </div>

          <div className="h-px bg-border/50" />

          <div className="grid gap-3">
            <div className='flex items-center space-x-2'>
              <label className="text-base font-medium text-foreground">Current Plan</label>
              <Crown className="w-4 h-4 text-amber-300 mb-2" />
            </div>
            <Input
              type="text"
              value={premiumPlan}
              disabled
              className="max-w-md"
            />
            <p className="text-sm text-muted-foreground">This is the current plan associated with your account.</p>
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
            <button
              onClick={() => setIsFirstDialogOpen(true)}
              className="whitespace-nowrap px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-600 hover:text-white text-sm font-medium rounded-md transition-colors shadow-sm cursor-pointer"
            >
              Delete Account
            </button>
          </div>
        </CardContent>
      </Card>

      {/* First Confirmation Dialog */}
      <Dialog open={isFirstDialogOpen} onOpenChange={setIsFirstDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="size-5" />
              Are you sure?
            </DialogTitle>
            <DialogDescription className="py-2 text-base text-slate-600">
              This action is permanent and cannot be undone. You will lose all your data associated with this account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 gap-3 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsFirstDialogOpen(false)}
              className="sm:mr-auto cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setIsFirstDialogOpen(false);
                setIsSecondDialogOpen(true);
              }}
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Second Confirmation Dialog (Text Validation) */}
      <Dialog
        open={isSecondDialogOpen}
        onOpenChange={(open) => {
          setIsSecondDialogOpen(open);
          if (!open) setConfirmationText("");
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Final Confirmation</DialogTitle>
            <DialogDescription className="py-2">
              To confirm your request, please type "<strong>{CONFIRMATION_STRING}</strong>" in the box below.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder={CONFIRMATION_STRING}
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              className="border-red-200 focus:ring-red-500/20"
            />
          </div>
          <DialogFooter className="mt-4 gap-3 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                setIsSecondDialogOpen(false);
                setConfirmationText("");
              }}
              className="sm:mr-auto cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={confirmationText !== CONFIRMATION_STRING || isDeleting}
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white cursor-pointer flex items-center justify-center"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Account"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};