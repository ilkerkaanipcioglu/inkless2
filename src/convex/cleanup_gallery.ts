import { internalMutation } from "./_generated/server";

export const removeEmptyGalleryItems = internalMutation({
  args: {},
  handler: async (ctx) => {
    const galleryItems = await ctx.db.query("gallery").collect();
    
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

      // 2. Remove duplicates based on title
      if (seenTitles.has(item.title)) {
        await ctx.db.delete(item._id);
        removedCount++;
        continue;
      }
      seenTitles.add(item.title);

      // 3. Remove duplicates based on image URL (if title is different but image is same)
      // We check beforeImageUrl as a proxy
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