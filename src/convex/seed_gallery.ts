import { internalMutation } from "./_generated/server";

export const seedGallery = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Check if gallery items already exist to avoid duplicates
    const existingGallery = await ctx.db.query("gallery").collect();
    if (existingGallery.length > 0) {
      // Clear existing to re-seed with new images
      for (const item of existingGallery) {
        await ctx.db.delete(item._id);
      }
    }

    const galleryItems = [
      {
        title: "Full Back Tattoo Removal",
        description: "Complete removal of large back tattoo with excellent results",
        beforeImageUrl: "/assets/gallery_brown.jpg",
        afterImageUrl: "/assets/gallery_brown.jpg",
        sessions: 6,
        category: "tattoo-removal"
      },
      {
        title: "Arm Tattoo Transformation",
        description: "Significant fading after just 4 treatment sessions",
        beforeImageUrl: "/assets/gallery_green.jpg",
        afterImageUrl: "/assets/gallery_green.jpg",
        sessions: 4,
        category: "tattoo-removal"
      },
      {
        title: "Small Tattoo Removal",
        description: "Quick and effective removal of small tattoo",
        beforeImageUrl: "/assets/gallery_small.jpg",
        afterImageUrl: "/assets/gallery_small.jpg",
        sessions: 3,
        category: "tattoo-removal"
      },
      {
        title: "Detailed Work Progress",
        description: "Progressive fading of detailed tattoo work",
        beforeImageUrl: "/assets/gallery_detailed.jpg",
        afterImageUrl: "/assets/gallery_detailed.jpg",
        sessions: 5,
        category: "tattoo-removal"
      },
      {
        title: "Color Tattoo Removal",
        description: "Multi-color tattoo removal showing excellent progress",
        beforeImageUrl: "/assets/gallery_color.jpg",
        afterImageUrl: "/assets/gallery_color.jpg",
        sessions: 7,
        category: "tattoo-removal"
      },
      {
        title: "Wrist Tattoo Removal",
        description: "Clean removal of wrist tattoo with minimal sessions",
        beforeImageUrl: "/assets/gallery_wrist.jpg",
        afterImageUrl: "/assets/gallery_wrist.jpg",
        sessions: 3,
        category: "tattoo-removal"
      },
      {
        title: "Neck Tattoo Removal",
        description: "Effective removal of neck tattoo",
        beforeImageUrl: "/assets/gallery_neck.jpg",
        afterImageUrl: "/assets/gallery_neck.jpg",
        sessions: 4,
        category: "tattoo-removal"
      },
      {
        title: "Chest Tattoo Removal",
        description: "Safe and effective removal process on chest",
        beforeImageUrl: "/assets/gallery_chest.png",
        afterImageUrl: "/assets/gallery_chest.png",
        sessions: 2,
        category: "tattoo-removal"
      },
      {
        title: "Arm Tattoo Removal",
        description: "Advanced laser treatment in progress",
        beforeImageUrl: "/assets/gallery_arm_1.png",
        afterImageUrl: "/assets/gallery_arm_1.png",
        sessions: 3,
        category: "tattoo-removal"
      },
      {
        title: "Back Tattoo Removal",
        description: "Successful complete removal of back tattoo",
        beforeImageUrl: "/assets/gallery_back_1.png",
        afterImageUrl: "/assets/gallery_back_1.png",
        sessions: 8,
        category: "tattoo-removal"
      },
      {
        title: "Leg Tattoo Removal",
        description: "Visible fading after treatment sessions",
        beforeImageUrl: "/assets/gallery_leg_1.png",
        afterImageUrl: "/assets/gallery_leg_1.png",
        sessions: 4,
        category: "tattoo-removal"
      },
      {
        title: "Shoulder Tattoo Removal",
        description: "High-quality laser removal results",
        beforeImageUrl: "/assets/gallery_shoulder.png",
        afterImageUrl: "/assets/gallery_shoulder.png",
        sessions: 5,
        category: "tattoo-removal"
      },
      {
        title: "Hand Tattoo Removal",
        description: "Delicate removal of hand tattoos",
        beforeImageUrl: "/assets/gallery_hand.png",
        afterImageUrl: "/assets/gallery_hand.png",
        sessions: 3,
        category: "tattoo-removal"
      },
      {
        title: "Finger Tattoo Removal",
        description: "Precise removal of finger tattoos",
        beforeImageUrl: "/assets/gallery_finger.png",
        afterImageUrl: "/assets/gallery_finger.png",
        sessions: 2,
        category: "tattoo-removal"
      },
      {
        title: "Foot Tattoo Removal",
        description: "Effective removal of foot tattoos",
        beforeImageUrl: "/assets/gallery_foot.png",
        afterImageUrl: "/assets/gallery_foot.png",
        sessions: 4,
        category: "tattoo-removal"
      },
      {
        title: "Faded Tattoo",
        description: "Significant fading of old tattoo",
        beforeImageUrl: "/assets/gallery_faded.jpg",
        afterImageUrl: "/assets/gallery_faded.jpg",
        sessions: 5,
        category: "tattoo-removal"
      }
    ];

    for (const item of galleryItems) {
      await ctx.db.insert("gallery", item);
    }

    return `Seeded ${galleryItems.length} gallery items`;
  },
});