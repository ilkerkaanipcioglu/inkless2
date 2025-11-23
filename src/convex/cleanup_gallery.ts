import { internalMutation } from "./_generated/server";

export const removeEmptyGalleryItems = internalMutation({
  args: {},
  handler: async (ctx) => {
    const galleryItems = await ctx.db.query("gallery").collect();
    
    let removedCount = 0;
    for (const item of galleryItems) {
      // Remove items with empty, missing, or invalid image URLs
      if (!item.beforeImageUrl || !item.afterImageUrl || 
          item.beforeImageUrl.trim() === "" || 
          item.afterImageUrl.trim() === "") {
        await ctx.db.delete(item._id);
        removedCount++;
      }
    }
    
    return { message: `Removed ${removedCount} empty gallery items` };
  },
});
