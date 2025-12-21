import "./App.css";
import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button";
import { DotPattern } from "./components/ui/dot-pattern";
import Homepage from "./pages/Homepage";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { SignOutButton } from "@clerk/clerk-react";
import { useSignIn } from "@clerk/clerk-react";
// import { GoogleOneTap } from "@clerk/clerk-react";
import UserProfilePage from "./components/UserProfilePage";
import ScrollButtons from "./components/ScrollBtn";
import { useRef } from "react";
// import VerifyEmailPage from "./components/VerifyEmailPage";

function App() {
  const location = useLocation();
  const featureRef = useRef(null);
  const workflowRef = useRef(null);
  const testimonialsRef = useRef(null);
  const { signIn } = useSignIn();

  return (
    <div className="min-h-screen">
      {location.pathname == "/sign-in" || location.pathname == "/sign-up" || location.pathname == "/sign-up/verify-email-address" || location.pathname == "/sign-in /verify-email-address" ? <></> : <Navbar featureRef={featureRef} workflowRef={workflowRef} testimonialsRef={testimonialsRef} />}
      {/* <Navbar /> */}
      <Routes>
        {/* Sign up */}
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-up/sso-callback" element={<Signup />} />
        <Route path="/sign-up/verify-email-address" element={<Signup />} />

        {/* Sign in */}
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-in/sso-callback" element={<Login />} />
        <Route path="/sign-in/verify-email-address" element={<Login />} />
        <Route path="/sign-in/forget-password" element={<Login />} />
        <Route path="/sign-in/reset-password" element={<Login />} />
        <Route path="/sign-in/factor-one" element={<Login />} />

        {/* Verification */}
        {/* <Route path="/verify-email" element={<VerifyEmailPage />} /> */}

        {/* User Account */}
        <Route path="/user-profile" element={<UserProfilePage />} />

        {/* Sign out */}
        <Route path="/sign-out" element={<SignOutButton />} />

        <Route path="/" element={<Homepage featureRef={featureRef} workflowRef={workflowRef} testimonialsRef={testimonialsRef} />} />
      </Routes>

      

      {location.pathname == "/sign-in" || location.pathname == "/sign-up" || location.pathname == "/sign-up/verify-email-address" || location.pathname == "/sign-in /verify-email-address" ? <></> : <ScrollButtons />}
    </div>

  );
}

export default App;