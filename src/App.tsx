import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PublicProfile from "./components/PublicProfile";
import NotFound from "./pages/NotFound";
import Home from "./components/Home";
import ShareProfile from "./components/ShareProfile";

const queryClient = new QueryClient();

const App = () => (
  <>
    <Helmet>
      {/* Android Chrome / modern browsers */}
      <meta name="theme-color" content="#F9FAFB" />
      {/* iOS home-screen fullscreen */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="default"
      />
    </Helmet>

    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/share-profile" element={<ShareProfile />} />
            <Route path="/profile/:userId" element={<PublicProfile />} />
            <Route path="/index" element={<Index />} />
            <Route path="/sos-hold" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </>
);

export default App;
