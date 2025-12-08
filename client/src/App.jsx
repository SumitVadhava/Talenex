import "./App.css";
import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button";
import { DotPattern } from "./components/ui/dot-pattern";
import Homepage from "./pages/Homepage";
import {Routes,Route, useLocation} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { SignOutButton } from "@clerk/clerk-react";
import UserProfilePage from "./components/UserProfilePage";
import ScrollButtons from "./components/ScrollBtn";

function App() {
  const location = useLocation();
  console.log(location);
  

  return (
    <div className="min-h-screen">
      {location.pathname == "/sign-in" || location.pathname == "/sign-up" || location.pathname == "/sign-up/verify-email-address" || location.pathname == "/sign-in /verify-email-address" ? <></> : <Navbar /> }
      {/* <Navbar /> */}
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-in/factor-one" element={<Login />} />
        <Route path="/sign-in/sso-callback" element={<Login />} />
        <Route path="/sign-up/sso-callback" element={<Signup />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-out" element={<SignOutButton />} />
        <Route path="/sign-up/verify-email-address" element={<Signup />} />
        <Route path="/user-profile" element={<UserProfilePage />} />

        <Route path="/" element={<Homepage />} />
      </Routes>
      
      {location.pathname == "/sign-in" || location.pathname == "/sign-up" || location.pathname == "/sign-up/verify-email-address" || location.pathname == "/sign-in /verify-email-address" ? <></> :  <ScrollButtons /> }
    </div>
    
  );
}

export default App;