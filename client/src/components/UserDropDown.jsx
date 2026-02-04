import React, { useState, useRef, useEffect } from 'react';
import { Settings, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser, SignOutButton, useClerk } from "@clerk/clerk-react";
import axios from 'axios';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function UserDropdown() {
    const { user, isLoaded, isSignedIn } = useUser();
    const { signOut } = useClerk();
    const { userData } = useContext(UserContext);

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);


    useEffect(() => {
        if (!isLoaded || !isSignedIn) return;

        console.log("user from Clerk:", user.unsafeMetadata);

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isLoaded, isSignedIn]);


    return (
        <div className="relative" ref={dropdownRef}>
            <button

                className="flex items-center gap-3 px-4"
            >
                <img
                    src={user?.unsafeMetadata?.profile?.avatarUrl || userData?.profilePhotoUrl || user?.imageUrl || "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"}
                    alt="Profile"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="w-12 h-12 rounded-full cursor-pointer"
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-50 origin-top-right">
                    {/* User Info Section */}
                    <div className="px-4 py-6 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <img
                                src={user?.unsafeMetadata?.profile?.avatarUrl || userData?.profilePhotoUrl || user?.imageUrl || "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"}
                                alt="Profile"
                                className="w-13 h-13 rounded-full ring-2 ring-slate-100"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="text-lg font-semibold text-slate-900 truncate">
                                    {user?.unsafeMetadata?.fullName || userData?.fullName || user?.fullName || "Guest"}
                                </div>
                                <div className="text-sm text-slate-500 truncate">
                                    {userData?.email || user?.primaryEmailAddress?.emailAddress}
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
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
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
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
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