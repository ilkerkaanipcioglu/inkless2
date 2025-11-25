import { useEffect } from "react";
import { useLocation } from "react-router";

type MetaEntry = {
  title: string;
  description: string;
  keywords?: string;
};

const META_CONFIG: Record<string, MetaEntry> = {
  default: {
    title: "Inkless Is More | Premier Laser Tattoo Removal in Nairobi",
    description:
      "Inkless Is More delivers advanced laser tattoo removal in Nairobi using Picosecond technology for safe, scar-free results.",
    keywords:
      "tattoo removal Nairobi, laser tattoo removal Kenya, Inkless Is More, picosecond laser, scar-free tattoo removal",
  },
  "/": {
    title: "Inkless Is More | Modern Laser Tattoo Removal",
    description:
      "Discover Inkless Is More’s flagship tattoo removal experience with premium care, advanced lasers, and visible results.",
    keywords: "modern tattoo removal, Nairobi laser specialists, Inkless Is More home",
  },
  "/home-legacy": {
    title: "Home 1 | Classic Inkless Is More Experience",
    description:
      "Explore the legacy Inkless Is More layout that made us Kenya’s trusted name for laser tattoo removal.",
    keywords: "legacy homepage, Inkless Is More history",
  },
  "/home-design-3": {
    title: "Home 3 | Vibrant Tattoo Removal Journey",
    description:
      "Tour our bold third homepage concept highlighting results, process, and technology.",
    keywords: "homepage concept, tattoo removal process, Nairobi laser care",
  },
  "/home-design-4": {
    title: "Home 4 | Dark Luxe Laser Removal Concept",
    description:
      "Immerse yourself in a dark, gold-accented homepage showcasing premium tattoo removal.",
    keywords: "luxury tattoo removal, dark theme, premium laser care",
  },
  "/packages": {
    title: "Packages | Personalized Tattoo Removal Plans",
    description:
      "Compare Inkless Is More tattoo removal packages tailored to tattoo size, color, and lifestyle.",
    keywords: "tattoo removal packages, pricing, consultation",
  },
  "/book": {
    title: "Book Now | Schedule Your Laser Session",
    description:
      "Reserve your Inkless Is More consultation or treatment slot online in minutes.",
    keywords: "book laser appointment, tattoo removal booking",
  },
  "/bookings": {
    title: "Booking History | Manage Your Sessions",
    description:
      "Track past and upcoming Inkless Is More appointments in one place.",
    keywords: "laser booking history, manage appointments",
  },
  "/contact": {
    title: "Contact | Inkless Is More Nairobi",
    description:
      "Reach Inkless Is More via phone, email, or visit us at Two Rivers Mall in Nairobi.",
    keywords: "contact Inkless Is More, Two Rivers Mall, Nairobi laser clinic",
  },
  "/about": {
    title: "About | Meet the Inkless Is More Team",
    description:
      "Learn about our mission, specialists, and technology powering Nairobi’s leading tattoo removal studio.",
    keywords: "about Inkless Is More, team, mission",
  },
  "/gallery": {
    title: "Gallery | Real Tattoo Removal Results",
    description:
      "Browse before-and-after photos that showcase Inkless Is More laser breakthroughs.",
    keywords: "tattoo removal gallery, before after, results",
  },
  "/training": {
    title: "Training | Ambassador Program",
    description:
      "Join the Inkless Is More training and ambassador program to master laser removal.",
    keywords: "training program, ambassador, laser education",
  },
  "/blog": {
    title: "Blog | Insights on Tattoo Removal & Skin Care",
    description:
      "Read expert articles on tattoo removal science, aftercare, and client stories.",
    keywords: "tattoo removal blog, skin care tips, Inkless Is More articles",
  },
  "/faq": {
    title: "FAQ | Tattoo Removal Questions Answered",
    description:
      "Find answers to the most common tattoo removal questions, from pain levels to timelines.",
    keywords: "tattoo removal FAQ, questions, answers",
  },
  "/landing": {
    title: "Inkless Is More | Launching Your Experience",
    description:
      "A quick preview while your personalized Inkless Is More experience finishes loading.",
    keywords: "landing page, Inkless Is More preview",
  },
} as const;

const ensureMetaTag = (
  attribute: "name" | "property",
  key: string,
  content: string,
) => {
  if (!content) return;
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

export function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const meta = META_CONFIG[location.pathname] ?? META_CONFIG.default;
    document.title = meta.title;

    ensureMetaTag("name", "description", meta.description);
    ensureMetaTag("name", "robots", "index,follow");
    if (meta.keywords) {
      ensureMetaTag("name", "keywords", meta.keywords);
    }

    const url = `${window.location.origin}${location.pathname}`;
    ensureMetaTag("property", "og:title", meta.title);
    ensureMetaTag("property", "og:description", meta.description);
    ensureMetaTag("property", "og:type", "website");
    ensureMetaTag("property", "og:url", url);
    ensureMetaTag("name", "twitter:card", "summary_large_image");
    ensureMetaTag("name", "twitter:title", meta.title);
    ensureMetaTag("name", "twitter:description", meta.description);
  }, [location.pathname]);

  return null;
}
