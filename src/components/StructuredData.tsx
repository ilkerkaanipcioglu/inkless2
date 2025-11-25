import { useEffect } from "react";
import { useLocation } from "react-router";

export function StructuredData() {
  const location = useLocation();

  useEffect(() => {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Inkless Is More",
      "url": "https://www.inklessismore.ke",
      "logo": "https://harmless-tapir-303.convex.cloud/api/storage/3a0cc6c8-2026-4e31-a67c-013dc2ce5644",
      "description": "Premier laser tattoo removal clinic in Nairobi, Kenya using advanced Picosecond technology",
      "sameAs": [
        "https://www.facebook.com/share/1Fpjgbt6dm/",
        "https://www.instagram.com/inklessismore_?igsh=MWl4ZDR4ODZ3bDZjcQ==",
        "https://www.tiktok.com/@inkless_is_more_?_t=ZM-8wtKsaOIx4o&_r=1"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254-708-901-505",
        "contactType": "Customer Service",
        "areaServed": "KE",
        "availableLanguage": ["en"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Two Rivers Mall, 1st Floor",
        "addressLocality": "Nairobi",
        "addressCountry": "KE"
      }
    };

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Inkless Is More",
      "image": "https://harmless-tapir-303.convex.cloud/api/storage/3a0cc6c8-2026-4e31-a67c-013dc2ce5644",
      "description": "Laser tattoo removal clinic in Nairobi",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Two Rivers Mall, 1st Floor",
        "addressLocality": "Nairobi",
        "addressRegion": "Nairobi",
        "postalCode": "00100",
        "addressCountry": "KE"
      },
      "telephone": "+254-708-901-505",
      "email": "info@inklessismore.ke",
      "url": "https://www.inklessismore.ke",
      "priceRange": "KSh 5,000 - KSh 35,000",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    };

    const medicalBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Inkless Is More",
      "description": "Professional laser tattoo removal services",
      "medicalSpecialty": "Dermatology",
      "url": "https://www.inklessismore.ke"
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Laser Tattoo Removal",
      "description": "Professional laser tattoo removal using advanced Picosecond technology",
      "provider": {
        "@type": "Organization",
        "name": "Inkless Is More"
      },
      "areaServed": {
        "@type": "City",
        "name": "Nairobi",
        "addressCountry": "KE"
      },
      "priceRange": "KSh 5,000 - KSh 35,000"
    };

    const schemas = [
      { key: "organization", data: organizationSchema },
      { key: "local-business", data: localBusinessSchema },
      { key: "medical-business", data: medicalBusinessSchema },
      { key: "service", data: serviceSchema }
    ];

    schemas.forEach((schema) => {
      let script = document.head.querySelector<HTMLScriptElement>(`script[data-schema="${schema.key}"]`);
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-schema", schema.key);
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema.data);
    });
  }, [location.pathname]);

  return null;
}