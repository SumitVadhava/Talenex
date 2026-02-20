import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "/logo.png";
import { Terminal } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser, SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import UserDropdown from "./UserDropDown";
import { LogOut, X } from "lucide-react";
import { useState } from "react";

export default function Navbar({ heroRef, featureRef, workflowRef, testimonialsRef }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const pathName = useLocation();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  // const scrollToSection = (ref) => {
  //   ref.current?.scrollIntoView({ behavior: "smooth" });
  // };

  const navLinks = {
    default: [
      {
        label: "Home",
        action: (ref) => ref.current?.scrollIntoView({ behavior: "smooth" }),
        ref: heroRef,
      },
      {
        label: "Features",
        action: (ref) => ref.current?.scrollIntoView({ behavior: "smooth" }),
        ref: featureRef,
      },
      {
        label: "Workflow",
        action: (ref) => ref.current?.scrollIntoView({ behavior: "smooth" }),
        ref: workflowRef,
      },
      {
        label: "Testimonials",
        action: (ref) => ref.current?.scrollIntoView({ behavior: "smooth" }),
        ref: testimonialsRef,
      },
    ],
    user: [
      { label: "Explore", href: "/home" },
      { label: "My Swaps", href: "/my-swaps" },
      { label: "Messages", href: "/messages" },
      { label: "Connect", href: "/join/live-room" }
    ]
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border rounded-3xl bg-white/60 backdrop-blur-md sticky top-5 z-50 max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <img src={Logo} className="h-8 w-auto" alt="" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-8">
              {(isSignedIn ? navLinks["user"] : navLinks["default"]).map((link) => {
                const isActive = link.href && location.pathname === link.href;
                return (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink
                      className={`text-md font-semibold cursor-pointer px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-slate-50' : 'hover:bg-slate-25'
                        }`}
                      href={link.href}
                      onClick={(e) => {
                        // Use href for route navigation, action+ref for in-page scroll
                        if (link.href) {
                          e.preventDefault();
                          if (link.href === "/messages") {
                            const url = window.location.origin + "/messages";
                            window.open(url, "_blank");
                          } else {
                            navigate(link.href);
                          }
                        } else if (link.action && link.ref) {
                          e.preventDefault();
                          if(pathName.pathname === "/") {
                            link.action(link.ref);
                          } else {
                            navigate("/");
                            setTimeout(() => {
                              link.action(link.ref);
                            }, 100);
                          }
                        }
                      }}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* CTA button for desktop
        <div className="hidden md:block">
          <Button className="rounded-xl cursor-pointer" size="lg" onClick={() => navigate("/sign-in")}> <Terminal /> Get Started</Button>
        </div> */}

        {/* RIGHT SIDE (AUTH CTA) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Logged OUT */}
          <SignedOut>
            <Button
              className="rounded-xl cursor-pointer"
              size="lg"
              onClick={() => navigate("/sign-in")}
            >
              <Terminal /> Get Started
            </Button>
          </SignedOut>

          {/* Logged IN */}
          <SignedIn>
            <UserDropdown />
          </SignedIn>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="cursor-pointer">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="top" className="w-full h-auto pb-5 pt-6 px-6 border-b shadow-2xl [&>button]:top-9 [&>button]:right-6 [&>button]:cursor-pointer [&>button>svg]:size-6">
              <div className="flex flex-col gap-6">
                {/* Header inside drawer */}
                <div className="flex justify-between items-center h-12">
                  <div onClick={() => {
                    navigate("/");
                    setIsOpen(false);
                  }} className="cursor-pointer">
                    <img src={Logo} className="h-8 w-auto" alt="Logo" />
                  </div>
                  {/* Spacer to balance the logo against the close button */}
                </div>

                {/* Nav Links */}
                <div className="flex flex-col gap-1">
                  {(isSignedIn ? navLinks["user"] : navLinks["default"]).map((link) => {
                    const isActive = link.href && location.pathname === link.href;
                    return (
                      <button
                        key={link.label}
                        className={`text-left text-lg font-semibold py-4 px-4 rounded-xl transition-all duration-200 cursor-pointer ${isActive
                          ? 'bg-slate-100 text-primary scale-[1.02]'
                          : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        onClick={() => {
                          setIsOpen(false);
                          if (link.href) {
                            if (link.href === "/messages") {
                              window.open(link.href, "_blank");
                            } else {
                              navigate(link.href);
                            }
                          } else if (link.action && link.ref) {
                            link.action(link.ref);
                          }
                        }}
                      >
                        {link.label}
                      </button>
                    );
                  })}
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100">
                  {isSignedIn ? (
                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl">
                      <div className="flex items-center gap-3 cursor-pointer">
                        <img
                          src={user?.unsafeMetadata?.profile?.avatarUrl || user?.imageUrl || "/api/placeholder/40/40"}
                          className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                          alt="User"
                          onClick={() => {
                            setIsOpen(false);
                            navigate('/user-profile');
                          }}
                        />
                        <div className="flex flex-col min-w-0" onClick={() => {
                          setIsOpen(false);
                          navigate('/user-profile');
                        }}>
                          <span className="font-bold text-slate-900 truncate">
                            {user?.fullName || "User"}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          signOut(() => {
                            localStorage.clear("token");
                            navigate('/sign-in');
                          });
                        }}
                        className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                        title="Sign out"
                      >
                        <LogOut className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button
                        className="w-full h-12 rounded-xl text-md font-bold cursor-pointer transition-transform hover:scale-[1.02]"
                        onClick={() => {
                          setIsOpen(false);
                          navigate("/sign-in");
                        }}
                      >
                        Get Started
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full h-12 rounded-xl text-md font-bold cursor-pointer transition-transform hover:scale-[1.02]"
                        onClick={() => {
                          setIsOpen(false);
                          navigate("/contact");
                        }}
                      >
                        Contact Us
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
