import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Settings, LogOut, ChevronDown, CreditCard, Crown, CrownIcon, Loader2 } from 'lucide-react';
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
    const [showSignOutModal, setShowSignOutModal] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const dropdownRef = useRef(null);


    useEffect(() => {
        if (!isLoaded || !isSignedIn) return;

        const handleKeyDown = (e) => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable) {
                return;
            }

            const isModifier = e.ctrlKey || e.metaKey;
            if (isModifier) {
                switch (e.key.toLowerCase()) {
                    case 'a':
                        e.preventDefault();
                        navigate("/user-profile");
                        setIsOpen(false);
                        break;
                    case 'p':
                        e.preventDefault();
                        navigate("/pricing");
                        setIsOpen(false);
                        break;
                    case 'l':
                        e.preventDefault();
                        setShowSignOutModal(true);
                        setIsOpen(false);
                        break;
                }
            }
        };

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isLoaded, isSignedIn, navigate]);

    const handleConfirmSignOut = async () => {
        setIsSigningOut(true);
        await signOut(() => {
            localStorage.clear("token");
            navigate('/');
        });
        setIsSigningOut(false);
        setShowSignOutModal(false);
    };


    return (
        <>
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
                    <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-40 origin-top-right">
                        {/* User Info Section */}
                        <div className="px-4 py-6 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <img
                                    src={user?.unsafeMetadata?.profile?.avatarUrl || userData?.profilePhotoUrl || user?.imageUrl || "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"}
                                    alt="Profile"
                                    className="w-13 h-13 rounded-full ring-2 ring-slate-100"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="text-lg font-semibold text-slate-900 truncate flex items-center gap-1.5">
                                        {user?.unsafeMetadata?.fullName || userData?.fullName || user?.fullName || "Guest"}
                                        {/*{userData?.isPremium && <Crown className="ml-1 mt-1 w-4 h-4 text-amber-400 fill-amber-400" />} */}
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
                                <span className="ml-auto text-xs font-semibold text-slate-400">Ctrl + A</span>
                            </button>

                            <button
                                onClick={() => {
                                    navigate("/pricing")
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                                <div className="w-9 h-9 rounded-md bg-slate-100 flex items-center justify-center">
                                    <Crown className="w-5 h-5 text-slate-600" />
                                </div>
                                <span className="font-medium">Explore Premium</span>
                                <span className="ml-auto text-xs font-semibold text-slate-400">Ctrl + P</span>
                            </button>

                            <button
                                onClick={() => {
                                    setShowSignOutModal(true);
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                                <div className="w-9 h-9 rounded-md bg-slate-100 flex items-center justify-center">
                                    <LogOut className="w-5 h-5 text-slate-600" />
                                </div>
                                <span className="font-medium">Sign out</span>
                                <span className="ml-auto text-xs font-semibold text-slate-400">Ctrl + L</span>
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

            {/* Sign Out Confirmation Modal rendered via Portal to prevent navbar clipping */}
            {showSignOutModal && createPortal(
                <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center p-4 min-h-screen">
                    <div className="bg-white rounded-xl max-w-[425px] w-full p-6 shadow-lg animate-in fade-in zoom-in-95 duration-200 border border-slate-200">
                        <div className="flex flex-col gap-4 mb-6 text-left">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto">
                                <LogOut className="w-5 h-5 text-slate-900 ml-1" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-semibold leading-none tracking-tight text-slate-900 mb-2">
                                    Sign Out
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Are you sure you want to sign out? You will need to sign in again to access your account.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                            <button
                                onClick={() => setShowSignOutModal(false)}
                                disabled={isSigningOut}
                                className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 h-10 px-4 py-2 mt-2 sm:mt-0"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmSignOut}
                                disabled={isSigningOut}
                                className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-10 px-4 py-2 min-w-[100px]"
                            >
                                {isSigningOut ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Signing out...
                                    </>
                                ) : (
                                    "Sign Out"
                                )}
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}