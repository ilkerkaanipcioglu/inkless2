// This file is used to remove broken gallery items.
// It is a one-off script.
import { internalMutation } from "./_generated/server";

export const removeItems = internalMutation({
  args: {},
  handler: async (ctx) => {
    const titlesToRemove = [
      "Leg Tattoo Removal",
      "Detailed Work Progress"
    ];

    let count = 0;
    for (const title of titlesToRemove) {
      const items = await ctx.db
        .query("gallery")
        .filter((q) => q.eq(q.field("title"), title))
        .collect();

      for (const item of items) {
        await ctx.db.delete(item._id);
        count++;
      }
    }

    return `Removed ${count} items`;
  },
});