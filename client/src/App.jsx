import "./App.css";
import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button";
import { DotPattern } from "./components/ui/dot-pattern";
import LandingPage from "./pages/LandingPage";
import { Routes, Route, useLocation, useNavigate, matchPath } from "react-router-dom";
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
import AIMatchPage from "./pages/AIMatchPage";
import ScrollToTop from "./components/ScrollToTop";
import ChatsPage from "./pages/ChatsPage";
import PaymentPage from "./pages/PaymentPage";
import PricingPage from "./pages/PricingPage";
import ErrorPage from "./pages/ErrorPage";
import { setNavigate } from "./utils/navigationHelper";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
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
    "/sign-up/continue",
    "/onboarding",
    "/contact",
    "/faq",
    "/terms",
    "/privacy",
    "/payment",
    "/messages",
    "/bad-request",
    "/unauthorized",
    "/access-denied",
    "/server-error",
    "/maintenance",
  ];

  // All explicitly defined route patterns — if the current path matches none of
  // these, the * catch-all is active (404) and the navbar should also be hidden.
  const KNOWN_ROUTES = [
    "/", "/home", "/sign-in/*", "/sign-up/*", "/sign-out",
    "/onboarding", "/user-profile", "/user-profile/:id",
    "/user-details", "/user-details/:id",
    "/swap-request", "/messages", "/my-swaps",
    "/contact", "/faq", "/terms", "/privacy",
    "/ai-match", "/join/:roomId", "/pricing", "/payment",
    "/bad-request", "/unauthorized", "/access-denied", "/server-error", "/maintenance",
  ];

  const isKnownRoute = (pathname) =>
    KNOWN_ROUTES.some((pattern) => matchPath(pattern, pathname));

  const shouldHideNavbar = (pathname) =>
    hideNavbarRoutes.includes(pathname) ||
    pathname.startsWith("/sign-up/") ||
    pathname.startsWith("/sign-in/") ||
    !isKnownRoute(pathname);

  const [hideNavbar, setHideNavbar] = useState(shouldHideNavbar(location.pathname));

  // Register navigate for the Axios interceptor (runs once on mount)
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  useEffect(() => {
    setHideNavbar(shouldHideNavbar(location.pathname));
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
            <ProfilePage />
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
            <UserProfilePage />
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
            // <ProtectedRoute requireOnboarding={true}>
            // <ChatComingSoon />
            <ChatsPage />
            // </ProtectedRoute>
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


        {/*<Route
          path="/"
           element={<ErrorPage code="maintenance" />}
        />*/}

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
          path="/ai-match"
          element={
            <ProtectedRoute requireOnboarding={true}>
              <AIMatchPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/join/:roomId"
          element={
            <ProtectedRoute requireOnboarding={true}>
              <VideoCall setHideNavbar={setHideNavbar} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pricing"
          element={
            <ProtectedRoute requireOnboarding={true}>
              <PricingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute requireOnboarding={true}>
              <PaymentPage />
            </ProtectedRoute>
          }
        />

        
        <Route path="/bad-request" element={<ErrorPage code={400} />} />
        <Route path="/access-denied" element={<ErrorPage code={403} />} />
        <Route path="/server-error" element={<ErrorPage code={500} />} />
        <Route path="/maintenance" element={<ErrorPage code="maintenance" />} />

        
        <Route path="*" element={<ErrorPage code={404} />} />
      </Routes>


      {!hideNavbar && (
        <ScrollButtons />
      )}
    </div>
  );
}

export default App;