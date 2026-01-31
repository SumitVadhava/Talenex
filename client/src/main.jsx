import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleOneTap } from "@clerk/clerk-react";  // << import here
import OnBoarding from './pages/OnBoarding';
import UserProfilePage from './pages/UserProfilePage';
import Step1BasicInfo from './components/Step1BasicInfo';
import { UserProvider } from './context/UserContext';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const Goggle_OAuth_CLIENTID = import.meta.env.Goggle_OAuth_CLIENTID

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <GoogleOAuthProvider clientId="863502675248-h4qsus2lapne6ev5tg2t1uvru69kdo1o.apps.googleusercontent.com"> */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <GoogleOneTap cancelOnTapOutside={true} />
      <BrowserRouter>
        {/* <OnBoarding /> */}
        <UserProvider>
          <App />
        </UserProvider>
        {/* <UserProfilePage /> */}
      </BrowserRouter>
    </ClerkProvider>
    {/* </GoogleOAuthProvider> */}
  </StrictMode>
)