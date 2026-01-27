import React, { useState, useRef, useEffect } from 'react';
import { Settings, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser, SignOutButton, useClerk } from "@clerk/clerk-react";

export default function UserDropdown() {
    const { user, isLoaded, isSignedIn } = useUser();
    const { signOut } = useClerk();

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

      if (!isLoaded || !isSignedIn) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-3 px-4 py-2"
            >
                <img
                    src={user?.imageUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Sumit"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-50">
                    {/* User Info Section */}
                    <div className="px-4 py-6 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <img
                                src={user?.imageUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Sumit"}
                                alt="Profile"
                                className="w-12 h-12 rounded-full ring-2 ring-slate-100"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="text-lg font-semibold text-slate-900 truncate">
                                    {user?.fullName}
                                </div>
                                <div className="text-sm text-slate-500 truncate">
                                    {user.primaryEmailAddress?.emailAddress}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                        <button
                            onClick={() => {
                                navigate("/user-profile")
                                setIsOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            <div className="w-9 h-9 rounded-md bg-slate-100 flex items-center justify-center">
                                <Settings className="w-5 h-5 text-slate-600" />
                            </div>
                            <span className="font-medium">Manage account</span>
                        </button>

                        <button
                            onClick={() => {
                                signOut(() => {
                                    localStorage.clear("token");
                                    navigate('/');
                                });
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            <div className="w-9 h-9 rounded-md bg-slate-100 flex items-center justify-center">
                                <LogOut className="w-5 h-5 text-slate-600" />
                            </div>
                            <span className="font-medium">Sign out</span>
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-xs text-slate-700">Secured By Talenex</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}