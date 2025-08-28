import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import "./styles/index.css";
import App from "./App.tsx";
import { initGA, pageView } from "./lib/analytics";

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = "G-3Z24NDNTCT";

// Analytics tracking component
const AnalyticsTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view on location change
    pageView(
      document.title, 
      window.location.href, 
      location.pathname + location.search
    );
  }, [location]);
  
  return null;
};

// Separate file with exported components to avoid React Fast Refresh warning
export { AnalyticsTracker };

// Initialize Google Analytics
if (typeof window !== "undefined") {
  initGA(GA_MEASUREMENT_ID);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AnalyticsTracker />
      <App />
    </BrowserRouter>
  </StrictMode>
);
