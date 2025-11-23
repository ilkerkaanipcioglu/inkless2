import { useEffect } from "react";
import { useLocation } from "react-router";

export function CanonicalUrl() {
  const location = useLocation();
  
  useEffect(() => {
    // Base URL from environment or hardcoded as per project spec
    const baseUrl = "https://test.inklessismore.ke";
    
    // Construct the canonical URL
    // Remove trailing slash from pathname unless it's root
    const pathname = location.pathname === "/" 
      ? "" 
      : location.pathname.endsWith("/") 
        ? location.pathname.slice(0, -1) 
        : location.pathname;
        
    const canonicalUrl = `${baseUrl}${pathname}`;
    
    // Find or create the canonical link tag
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    
    link.setAttribute("href", canonicalUrl);
  }, [location]);

  return null;
}
