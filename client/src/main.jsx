import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import "stream-chat-react/dist/css/v2/index.css";
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleOneTap } from "@clerk/clerk-react";
import OnBoarding from './pages/OnBoarding';
import UserProfilePage from './pages/UserProfilePage';
import Step1BasicInfo from './components/Step1BasicInfo';
import { UserProvider } from './context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChatProvider } from './context/ChatContext';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const Goggle_OAuth_CLIENTID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ""

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,     
      cacheTime: 1000 * 60 * 60 * 6,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/' signInUrl='/sign-in' signUpUrl='/sign-up'>
    <GoogleOneTap cancelOnTapOutside={true} signUpUrl="/sign-up" signInUrl="/sign-in" />
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </ClerkProvider>
)