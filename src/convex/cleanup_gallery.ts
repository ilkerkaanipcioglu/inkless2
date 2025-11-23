import { internalMutation } from "./_generated/server";

export const removeEmptyGalleryItems = internalMutation({
  args: {},
  handler: async (ctx) => {
    const galleryItems = await ctx.db.query("gallery").collect();
    
    // List of valid image files that exist in public/assets
    const validImages = [
      "/assets/1-single-laser-tattoo-removal-session-994.webp",
      "/assets/1111__1_.jpg",
      "/assets/5-laser-tattoo-removal-sessions-medium-size-tattoo-treatment-753.webp",
      "/assets/9578BE17-D6D1-48F4-8525-F0AE08A82211_1_105_c_480x480.jpg",
      "/assets/AA99C17D-3B23-40B0-84E3-901869B56057_480x480.jpg",
      "/assets/Arm_Bat_Tattoo.jpg",
      "/assets/B0A79D7D-80DC-43C6-AC34-23ACC6E164A7_1_105_c_480x480.jpg",
      "/assets/Before_and_After_3b82c4e4-de7b-46a0-a795-ed19791107a3_480x480.jpg",
      "/assets/Brown_Minimalist_Skincare_Before_After_Collage_Instagram_Post.jpg",
      "/assets/Eyebrow_Tattoo_Removal_Inkless.jpeg",
      "/assets/Gabriel_s_Testimonial.jpg",
      "/assets/Green_Gentle_Before_and_After_Instagram_Post.jpg",
      "/assets/IMG_8655_480x480.jpg",
      "/assets/Inkless_eyebrow_tattoo_removal.jpg",
      "/assets/Inkless_is_more_Original_Graphic.jpg",
      "/assets/Laser_Scar_Removal.jpg",
      "/assets/Screenshot_2025-05-08_at_18.52.48.png",
      "/assets/Screenshot_2025-05-08_at_18.53.30.png",
      "/assets/Screenshot_2025-05-08_at_18.56.33.png",
      "/assets/Screenshot_2025-05-08_at_18.57.22.png",
      "/assets/Screenshot_2025-05-08_at_18.58.04.png",
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