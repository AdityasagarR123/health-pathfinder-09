import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import AuthForm from "@/components/auth/AuthForm";
import PatientDashboard from "@/components/dashboard/PatientDashboard";
import DoctorDashboard from "@/components/dashboard/DoctorDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

interface User {
  id: string;
  name: string;
  age: string;
  gender: string;
  role: string;
  cancerType?: string;
  stage?: string;
  preferences?: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  const handleAuth = (userData: User) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowAuth(false);
  };

  const handleGetStarted = () => {
    setShowAuth(true);
  };

  const HomePage = () => {
    if (!user && !showAuth) {
      return (
        <div onClick={handleGetStarted} className="cursor-pointer">
          <HeroGeometric 
            badge="Cancer Prediction Platform"
            title1="AI-Powered Cancer"
            title2="Risk Assessment"
            subtitle="Advanced machine learning algorithms providing accurate cancer predictions and personalized treatment recommendations for better health outcomes."
          />
        </div>
      );
    }

    if (!user && showAuth) {
      return <AuthForm onAuth={handleAuth} />;
    }

    if (user && user.role === "patient") {
      return <PatientDashboard user={user} onLogout={handleLogout} />;
    }

    if (user && user.role === "doctor") {
      return <DoctorDashboard user={user} onLogout={handleLogout} />;
    }

    return <NotFound />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;