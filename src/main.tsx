import { Toaster } from "@/components/ui/sonner";
import { VlyToolbar } from "../vly-toolbar-readonly.tsx";
import { InstrumentationProvider } from "@/instrumentation.tsx";
import AuthPage from "@/pages/Auth.tsx";
import NotFound from "@/pages/NotFound.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import "./index.css";
import "./types/global.d.ts";
import { CanonicalUrl } from "@/components/CanonicalUrl";
import { SeoManager } from "@/components/SeoManager";
import { StructuredData } from "@/components/StructuredData";
import Home from "./pages/Home.tsx";
import Packages from "./pages/Packages.tsx";
import About from "./pages/About.tsx";
import Gallery from "./pages/Gallery.tsx";
import Training from "./pages/Training.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import FAQ from "./pages/FAQ.tsx";
import PackageDetail from "./pages/PackageDetail.tsx";
import BookNow from "./pages/BookNow.tsx";
import BookingHistory from "./pages/BookingHistory.tsx";
import Admin from "./pages/Admin.tsx";
import Contact from "./pages/Contact.tsx";

const convexUrl = import.meta.env.VITE_CONVEX_URL as string;
if (!convexUrl) {
  console.error("VITE_CONVEX_URL is not set. Please configure it in your deployment settings.");
}

const convex = new ConvexReactClient(convexUrl);

function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VlyToolbar />
    <InstrumentationProvider>
      <ConvexAuthProvider client={convex}>
        <BrowserRouter>
          <CanonicalUrl />
          <SeoManager />
          <StructuredData />
          <RouteSyncer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/landing" element={<Home />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:id" element={<PackageDetail />} />
            <Route path="/book" element={<BookNow />} />
            <Route path="/bookings" element={<BookingHistory />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/training" element={<Training />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/auth" element={<AuthPage redirectAfterAuth="/" />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ConvexAuthProvider>
    </InstrumentationProvider>
  </StrictMode>,
);