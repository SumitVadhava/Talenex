import "./App.css";
import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button";
import { DotPattern } from "./components/ui/dot-pattern";
import LandingPage from "./pages/LandingPage";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { SignOutButton } from "@clerk/clerk-react";
import ScrollButtons from "./components/ScrollBtn";
import { useEffect, useRef, useState } from "react";
import Homepage from "./pages/Homepage";
import OnBoarding from "./pages/OnBoarding";
import OnboardingGuard from "./components/OnboardingGuard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import UserProfilePage from "./pages/UserProfilePage";
import SwapRequestForm from "./components/SwapRequestForm";
import { Video } from "lucide-react";
import VideoCall from "./components/VideoCall";
import Step1BasicInfo from "./components/Step1BasicInfo";
import MySwapsPage from "./pages/MySwapsPage";
import ChatComingSoon from "./pages/ChatComingSoon";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ScrollToTop from "./components/ScrollToTop";
// import VerifyEmailPage from "./components/VerifyEmailPage";

function App() {
  const location = useLocation();
  const featureRef = useRef(null);
  const workflowRef = useRef(null);
  const testimonialsRef = useRef(null);
  const heroRef = useRef(null);
  // const { signIn } = useSignIn();

  const hideNavbarRoutes = [
    "/sign-in",
    "/sign-up",
    "/sign-in/sso-callback",
    "/sign-up/sso-callback",
    "/sign-in/verify-email-address",
    "/sign-up/verify-email-address",
    "/sign-in/factor-one",
    "/onboarding",
    "/contact",
    "/faq",
    "/terms",
    "/privacy"
  ];

  const [hideNavbar, setHideNavbar] = useState(hideNavbarRoutes.includes(location.pathname));

  useEffect(() => {
    setHideNavbar(hideNavbarRoutes.includes(location.pathname));
  }, [location.pathname]);

  return (

    <div className="min-h-screen">
      <ScrollToTop />
      {!hideNavbar && (
        <Navbar
          featureRef={featureRef}
          workflowRef={workflowRef}
          testimonialsRef={testimonialsRef}
          heroRef={heroRef}

        />
      )}

      {/* <Navbar /> */}

      <Routes>
        {/* Sign up */}
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-up/sso-callback" element={<Signup />} />
        <Route path="/sign-up/verify-email-address" element={<Signup />} />
        <Route path="/sign-up/continue" element={<Signup />} />


        {/* Sign in */}
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-in/sso-callback" element={<Login />} />
        <Route path="/sign-in/verify-email-address" element={<Login />} />
        <Route path="/sign-in/forget-password" element={<Login />} />
        <Route path="/sign-in/reset-password" element={<Login />} />
        <Route path="/sign-in/factor-one" element={<Login />} />
        <Route path="/sign-in/factor-two" element={<Login />} />

        {/* User Account - Protected Routes */}
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-profile/:id"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-details"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-details/:id"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Sign out */}
        <Route path="/sign-out" element={<SignOutButton />} />

        <Route
          path="/swap-request"
          element={
            <ProtectedRoute requireOnboarding={true}>
              <SwapRequestForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute requireOnboarding={true}>
              <ChatComingSoon />
            </ProtectedRoute>
          }
        />

        <Route path="/onboarding" element={
          <ProtectedRoute>
            <OnBoarding />
          </ProtectedRoute>}
        />

        <Route
          path="/"
          element={
            <LandingPage
              featureRef={featureRef}
              workflowRef={workflowRef}
              testimonialsRef={testimonialsRef}
              heroRef={heroRef}
            />
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute requireOnboarding={true}>
              <Homepage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-swaps"
          element={
            <ProtectedRoute requireOnboarding={true}>
              <MySwapsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={<ContactPage />}
        />

        <Route
          path="/faq"
          element={<FAQPage />}
        />

        <Route
          path="/terms"
          element={<TermsPage />}
        />

        <Route
          path="/privacy"
          element={<PrivacyPage />}
        />

        <Route
          path="/join/:roomId"
          element={
            <ProtectedRoute requireOnboarding={true}>
              <VideoCall setHideNavbar={setHideNavbar} />
            </ProtectedRoute>
          }
        />
      </Routes>


      {!hideNavbar && (
        <ScrollButtons />
      )}
    </div>
  );
}

export default App;