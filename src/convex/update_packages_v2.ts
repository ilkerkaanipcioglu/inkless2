import { internalMutation } from "./_generated/server";

export const updatePackagesV2 = internalMutation({
  args: {},
  handler: async (ctx) => {
    const packages = await ctx.db.query("packages").collect();

    for (const pkg of packages) {
      if (pkg.title.includes("Single") || pkg.price === 5000) {
        await ctx.db.patch(pkg._id, {
          title: "1 Single Laser Tattoo Removal Session",
          description: "Our 'pay-per-session' option offers flexibility to the ones willing to fade their tattoos away at their own pace. No colossal saving, no engagement, no rush.",
          price: 5000,
          imageUrl: "https://www.inklessismore.ke/cdn/shop/files/Single_Session.jpg?v=1763724288&width=1946",
          features: [
            "One laser removal session",
            "Professional consultation",
            "Aftercare guidance",
            "Safe and scar-free",
            "4-week recovery interval",
          ],
        });
      } else if (pkg.title.includes("Starter") || pkg.sessions === 2 || pkg.price === 9000) {
        await ctx.db.patch(pkg._id, {
          title: "2 Laser Tattoo Removal Sessions (small size tattoo)",
          description: "Perfect for small tattoos or to see how your skin responds. Very likely to completely remove any small or thin tattoo.",
          price: 9000,
          originalPrice: 10000,
          sessions: 2,
          imageUrl: "https://www.inklessismore.ke/cdn/shop/files/2_Sessions_3948d9a6-f510-4678-b0fe-21d017bcd5dd.jpg?v=1763727082&width=1946",
          features: [
            "2 laser removal sessions",
            "Save KSh 1,000",
            "Ideal for small/thin tattoos",
            "Flexible scheduling",
            "Complete aftercare support",
          ],
        });
      } else if (pkg.title.includes("Popular") || pkg.sessions === 5 || pkg.price === 20000) {
        await ctx.db.patch(pkg._id, {
          title: "5 Laser Tattoo Removal Sessions (medium size tattoo)",
          description: "Our most popular package. Big saving, big results. Ideal for medium size tattoos.",
          price: 20000,
          originalPrice: 25000,
          sessions: 5,
          imageUrl: "https://www.inklessismore.ke/cdn/shop/files/5_Sessions.jpg?v=1763724687&width=1946",
          features: [
            "5 laser removal sessions",
            "Save KSh 5,000",
            "Most popular package",
            "Visible results guaranteed",
            "Priority booking",
          ],
        });
      } else if (pkg.title.includes("Complete") || pkg.price === 35000) {
        await ctx.db.patch(pkg._id, {
          title: "Unlimited Laser Tattoo Removal Sessions Package",
          description: "Pay one price, get the best possible results. Includes as many sessions as it takes to achieve full tattoo removal.",
          price: 35000,
          originalPrice: 60000,
          imageUrl: "https://www.inklessismore.ke/cdn/shop/files/Unlimited_Sessions.jpg?v=1763724845&width=1946",
          features: [
            "Unlimited sessions until removal",
            "Big savings (est. 60%)",
            "Complete removal guarantee",
            "Includes multiple tattoos",
            "VIP support",
          ],
        });
      }
    }

    return "Packages updated successfully with V2 data";
  },
});
