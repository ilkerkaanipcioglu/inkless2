import { internalMutation } from "./_generated/server";

export const updateGallery = internalMutation({
  args: {},
  handler: async (ctx) => {
    // 1. Delete existing gallery items
    const existing = await ctx.db.query("gallery").collect();
    for (const item of existing) {
      await ctx.db.delete(item._id);
    }

    // 2. Add new items
    const items = [
      {
        title: "Eyebrow Removal Progress",
        description: "Visible lightening of eyebrow tattoo pigment.",
        imageUrl: "https://harmless-tapir-303.convex.cloud/api/storage/ea7e7b43-48bb-45e6-ac48-71493686de17",
        sessions: 2, // Estimate "In Progress"
        category: "Face",
      },
      {
        title: "Arm Text Tattoo",
        description: "Complete removal of text tattoo on forearm.",
        imageUrl: "https://harmless-tapir-303.convex.cloud/api/storage/399d9181-b390-45cb-89e5-9cebd8f7cd51",
        sessions: 5,
        category: "Body",
      },
      {
        title: "Eyebrow Transformation",
        description: "Progressive fading of eyebrow tattoo over 3 sessions.",
        imageUrl: "https://harmless-tapir-303.convex.cloud/api/storage/23de61aa-152b-477b-8fb8-d5f541e1d605",
        sessions: 3,
        category: "Face",
      },
      {
        title: "Neck Tattoo Removal",
        description: "Significant fading of neck tattoo.",
        imageUrl: "https://harmless-tapir-303.convex.cloud/api/storage/a8f51ad1-5204-447f-a778-1ede3533de12",
        sessions: 4,
        category: "Body",
      },
      {
        title: "Arm Tattoo Removal",
        description: "Successful removal of arm tattoo.",
        imageUrl: "https://harmless-tapir-303.convex.cloud/api/storage/5403dfab-233d-41d9-aefb-e52c922381fc",
        sessions: 6,
        category: "Body",
      },
    ];

    for (const item of items) {
      await ctx.db.insert("gallery", {
        title: item.title,
        description: item.description,
        beforeImageUrl: item.imageUrl,
        afterImageUrl: item.imageUrl, // Using same image for collage
        sessions: item.sessions,
        category: item.category,
      });
    }
    
    console.log(`Updated gallery with ${items.length} new items.`);
  },
});
