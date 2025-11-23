import { internalMutation } from "./_generated/server";

export const removeEmptyGalleryItems = internalMutation({
  args: {},
  handler: async (ctx) => {
    const galleryItems = await ctx.db.query("gallery").collect();
    
    // List of valid image files that exist in public/assets
    const validImages = [
      "/assets/process_treatment.jpg",
      "/assets/process_scar_removal.jpg",
      "/assets/gallery_neck.jpg",
      "/assets/gallery_wrist.jpg",
      "/assets/gallery_small.jpg",
      "/assets/gallery_color.jpg",
      "/assets/gallery_chest.png",
      "/assets/gallery_arm_1.png",
      "/assets/gallery_arm_2.png",
      "/assets/gallery_back_1.png",
      "/assets/gallery_back_2.png",
      "/assets/gallery_leg_1.png",
      "/assets/gallery_leg_2.png",
      "/assets/gallery_shoulder.png",
      "/assets/gallery_hand.png",
      "/assets/gallery_finger.png",
      "/assets/gallery_neck_2.png",
      "/assets/gallery_foot.png",
      "/assets/gallery_laser.png",
      "/assets/gallery_result.png",
      "/assets/gallery_detailed.jpg",
      "/assets/gallery_faded.jpg",
      "/assets/gallery_green.jpg",
      "/assets/gallery_brown.jpg",
      "/assets/testimonial_gabriel.jpg"
    ];
    
    let removedCount = 0;
    const seenTitles = new Set<string>();
    const seenImages = new Set<string>();

    for (const item of galleryItems) {
      // 1. Remove items with empty, missing, or invalid image URLs
      if (!item.beforeImageUrl || !item.afterImageUrl || 
          item.beforeImageUrl.trim() === "" || 
          item.afterImageUrl.trim() === "") {
        await ctx.db.delete(item._id);
        removedCount++;
        continue;
      }

      // 2. Remove items where the image files don't actually exist
      if (!validImages.includes(item.beforeImageUrl) || !validImages.includes(item.afterImageUrl)) {
        await ctx.db.delete(item._id);
        removedCount++;
        continue;
      }

      // 3. Remove duplicates based on title
      if (seenTitles.has(item.title)) {
        await ctx.db.delete(item._id);
        removedCount++;
        continue;
      }
      seenTitles.add(item.title);

      // 4. Remove duplicates based on image URL (if title is different but image is same)
      if (seenImages.has(item.beforeImageUrl)) {
        await ctx.db.delete(item._id);
        removedCount++;
        continue;
      }
      seenImages.add(item.beforeImageUrl);
    }
    
    return { message: `Removed ${removedCount} empty or duplicate gallery items` };
  },
});