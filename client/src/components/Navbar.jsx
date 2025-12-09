import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import Logo from "../assets/logo.png";
import { Terminal } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Navbar({ featureRef, workflowRef, testimonialsRef }) {
  const navigate = useNavigate();

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
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
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="text-md font-semibold cursor-pointer">
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink className="text-md font-semibold cursor-pointer" onClick={(e) => scrollToSection(featureRef)}>
                  Features
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink className="text-md font-semibold cursor-pointer" onClick={(e) => scrollToSection(workflowRef)}>
                  Workflow
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink className="text-md font-semibold cursor-pointer" onClick={(e) => scrollToSection(testimonialsRef)}>
                  Testimonials
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* CTA button for desktop */}
        <div className="hidden md:block">
          <Button className="rounded-xl cursor-pointer" size="lg" onClick={() => navigate("/sign-in")}> <Terminal /> Get Started</Button>
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
                <a className="text-lg" href="/">Home</a>
                <a className="text-lg" href="/about">About</a>
                <a className="text-lg" href="/services">Services</a>
                <a className="text-lg" href="/contact">Contact</a>

                <Button className="mt-4">Get Started</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
