import { internalMutation } from "./_generated/server";

export const seedGallery = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Check if gallery items already exist to avoid duplicates
    const existingGallery = await ctx.db.query("gallery").collect();
    if (existingGallery.length > 0) {
      // Optional: Clear existing to re-seed or just return
      // For now, let's clear and re-seed to ensure we have the latest
      for (const item of existingGallery) {
        await ctx.db.delete(item._id);
      }
    }

    const galleryItems = [
      {
        title: "Full Back Tattoo Removal",
        description: "Complete removal of large back tattoo with excellent results",
        beforeImageUrl: "/assets/Brown_Minimalist_Skincare_Before_After_Collage_Instagram_Post.jpg",
        afterImageUrl: "/assets/Brown_Minimalist_Skincare_Before_After_Collage_Instagram_Post.jpg", // Using same for now as it's a collage
        sessions: 6,
        category: "tattoo-removal"
      },
      {
        title: "Arm Tattoo Transformation",
        description: "Significant fading after just 4 treatment sessions",
        beforeImageUrl: "/assets/Green_Gentle_Before_and_After_Instagram_Post.jpg",
        afterImageUrl: "/assets/Green_Gentle_Before_and_After_Instagram_Post.jpg",
        sessions: 4,
        category: "tattoo-removal"
      },
      {
        title: "Small Tattoo Removal",
        description: "Quick and effective removal of small tattoo",
        beforeImageUrl: "/assets/Before_and_After_3b82c4e4-de7b-46a0-a795-ed19791107a3_480x480.jpg",
        afterImageUrl: "/assets/Before_and_After_3b82c4e4-de7b-46a0-a795-ed19791107a3_480x480.jpg",
        sessions: 3,
        category: "tattoo-removal"
      },
      {
        title: "Detailed Work Progress",
        description: "Progressive fading of detailed tattoo work",
        beforeImageUrl: "/assets/9578BE17-D6D1-48F4-8525-F0AE08A82211_1_105_c_480x480.jpg",
        afterImageUrl: "/assets/9578BE17-D6D1-48F4-8525-F0AE08A82211_1_105_c_480x480.jpg",
        sessions: 5,
        category: "tattoo-removal"
      },
      {
        title: "Color Tattoo Removal",
        description: "Multi-color tattoo removal showing excellent progress",
        beforeImageUrl: "/assets/B0A79D7D-80DC-43C6-AC34-23ACC6E164A7_1_105_c_480x480.jpg",
        afterImageUrl: "/assets/B0A79D7D-80DC-43C6-AC34-23ACC6E164A7_1_105_c_480x480.jpg",
        sessions: 7,
        category: "tattoo-removal"
      },
      {
        title: "Wrist Tattoo Removal",
        description: "Clean removal of wrist tattoo with minimal sessions",
        beforeImageUrl: "/assets/AA99C17D-3B23-40B0-84E3-901869B56057_480x480.jpg",
        afterImageUrl: "/assets/AA99C17D-3B23-40B0-84E3-901869B56057_480x480.jpg",
        sessions: 3,
        category: "tattoo-removal"
      },
      {
        title: "Safe Tattoo Removal",
        description: "Safe and effective removal process",
        beforeImageUrl: "/assets/Screenshot_2025-05-08_at_18.52.48.png",
        afterImageUrl: "/assets/Screenshot_2025-05-08_at_18.52.48.png",
        sessions: 2,
        category: "tattoo-removal"
      },
      {
        title: "Laser Tattoo Removal",
        description: "Advanced laser treatment in progress",
        beforeImageUrl: "/assets/Screenshot_2025-05-08_at_18.53.30.png",
        afterImageUrl: "/assets/Screenshot_2025-05-08_at_18.53.30.png",
        sessions: 3,
        category: "tattoo-removal"
      },
      {
        title: "Complete Removal",
        description: "Successful complete removal of tattoo",
        beforeImageUrl: "/assets/Screenshot_2025-05-08_at_18.56.33.png",
        afterImageUrl: "/assets/Screenshot_2025-05-08_at_18.56.33.png",
        sessions: 8,
        category: "tattoo-removal"
      },
      {
        title: "Tattoo Removal Progress",
        description: "Visible fading after treatment sessions",
        beforeImageUrl: "/assets/Screenshot_2025-05-08_at_18.57.22.png",
        afterImageUrl: "/assets/Screenshot_2025-05-08_at_18.57.22.png",
        sessions: 4,
        category: "tattoo-removal"
      },
      {
        title: "Effective Treatment",
        description: "High-quality laser removal results",
        beforeImageUrl: "/assets/Screenshot_2025-05-08_at_18.58.04.png",
        afterImageUrl: "/assets/Screenshot_2025-05-08_at_18.58.04.png",
        sessions: 5,
        category: "tattoo-removal"
      },
      {
        title: "Eyebrow Tattoo Removal",
        description: "Delicate removal of eyebrow tattoos",
        beforeImageUrl: "/assets/Inkless_eyebrow_tattoo_removal.jpg",
        afterImageUrl: "/assets/Inkless_eyebrow_tattoo_removal.jpg",
        sessions: 2,
        category: "specialized"
      },
      {
        title: "Inkless Eyebrow Removal",
        description: "Safe inkless removal technique for eyebrows",
        beforeImageUrl: "/assets/Eyebrow_Tattoo_Removal_Inkless.jpeg",
        afterImageUrl: "/assets/Eyebrow_Tattoo_Removal_Inkless.jpeg",
        sessions: 2,
        category: "specialized"
      },
      {
        title: "Arm Bat Tattoo Removal",
        description: "Removal of large arm tattoo",
        beforeImageUrl: "/assets/Arm_Bat_Tattoo.jpg",
        afterImageUrl: "/assets/Arm_Bat_Tattoo.jpg",
        sessions: 6,
        category: "tattoo-removal"
      }
    ];

    for (const item of galleryItems) {
      await ctx.db.insert("gallery", item);
    }

    return `Seeded ${galleryItems.length} gallery items`;
  },
});
