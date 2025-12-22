import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import Logo from "../assets/logo.png";
import { Terminal } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useUser, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";

export default function Navbar({ featureRef, workflowRef, testimonialsRef }) {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useUser();

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = {
    default: [
      { label: "Home", href: "/" },
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
      { label: "My Swaps", href: "/swaps" },
      { label: "Messages", href: "/messages" }
    ]
  };

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
              {(isSignedIn ? navLinks["user"] : navLinks["default"]).map((link) => (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuLink
                    className="text-md font-semibold cursor-pointer"
                    href={link.href}
                    onClick={(e) => {
                      // Use href for route navigation, action+ref for in-page scroll
                      if (link.href) {
                        e.preventDefault();
                        navigate(link.href);
                      } else if (link.action && link.ref) {
                        e.preventDefault();
                        link.action(link.ref);
                      }
                    }}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
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
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-14 h-14 min-w-[45px] min-h-[45px]",
                  avatarImage: "w-full h-full object-cover",
                },
              }}
            />
          </SignedIn>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64">
              <div className="mt-10 flex flex-col gap-4">
                {(isSignedIn ? navLinks["user"] : navLinks["default"]).map((link) => (
                  <button
                    key={link.label}
                    className="text-left text-lg cursor-pointer"
                    onClick={() => {
                      if (link.href) {
                        navigate(link.href);
                      } else if (link.action && link.ref) {
                        link.action(link.ref);
                      }
                    }}
                  >
                    {link.label}
                  </button>
                ))}

                <Button
                  className="mt-4"
                  onClick={() => navigate("/sign-in")}
                >
                  Get Started
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
