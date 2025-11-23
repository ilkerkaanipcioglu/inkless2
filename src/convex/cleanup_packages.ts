import { internalMutation } from "./_generated/server";

export const cleanupPackages = internalMutation({
  args: {},
  handler: async (ctx) => {
    const packages = await ctx.db.query("packages").collect();
    let messages: string[] = [];

    for (const pkg of packages) {
      let shouldBeAvailable = false;

      // Check for the 4 specific packages based on price
      // 1. Single Session (5000)
      if (pkg.price === 5000) {
        shouldBeAvailable = true;
      }
      // 2. 2 Sessions (9000)
      else if (pkg.price === 9000) {
        shouldBeAvailable = true;
      }
      // 3. 5 Sessions (20000)
      else if (pkg.price === 20000) {
        shouldBeAvailable = true;
      }
      // 4. Unlimited (35000)
      else if (pkg.price === 35000) {
        shouldBeAvailable = true;
      }

      if (shouldBeAvailable) {
        // Ensure it is available
        if (!pkg.isAvailable) {
          await ctx.db.patch(pkg._id, { isAvailable: true });
          messages.push(`Enabled package: ${pkg.title}`);
        }
      } else {
        // Disable all other packages so they don't show up
        if (pkg.isAvailable) {
          await ctx.db.patch(pkg._id, { isAvailable: false });
          messages.push(`Disabled package: ${pkg.title}`);
        }
      }
    }
    return messages.join("\n");
  },
});
