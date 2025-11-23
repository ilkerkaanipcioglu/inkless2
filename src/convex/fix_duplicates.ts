import { internalMutation } from "./_generated/server";

export const fixDuplicates = internalMutation({
  args: {},
  handler: async (ctx) => {
    const packages = await ctx.db.query("packages").collect();
    
    const singleSessionPackages = packages.filter(p => 
      p.title.includes("1 Single") || 
      (p.price === 5000 && !p.sessions)
    );

    const twoSessionPackages = packages.filter(p => 
      p.title.includes("2 Laser Tattoo Removal Sessions") || 
      (p.sessions === 2 && p.price === 9000)
    );

    const fiveSessionPackages = packages.filter(p => 
      p.title.includes("5 Laser Tattoo Removal Sessions") || 
      (p.sessions === 5 && p.price === 20000)
    );

    const unlimitedPackages = packages.filter(p => 
      p.title.includes("Unlimited") || 
      p.price === 35000
    );

    let messages: string[] = [];

    // Handle Single Session duplicates
    if (singleSessionPackages.length > 1) {
      const [keep, ...remove] = singleSessionPackages;
      for (const pkg of remove) {
        await ctx.db.delete(pkg._id);
        messages.push(`Deleted duplicate Single Session package (${pkg._id}).`);
      }
    }

    // Handle 2 Session duplicates
    if (twoSessionPackages.length > 1) {
      const [keep, ...remove] = twoSessionPackages;
      for (const pkg of remove) {
        await ctx.db.delete(pkg._id);
        messages.push(`Deleted duplicate 2-session package (${pkg._id}).`);
      }
    }

    // Handle 5 Session duplicates
    if (fiveSessionPackages.length > 1) {
      const [keep, ...remove] = fiveSessionPackages;
      for (const pkg of remove) {
        await ctx.db.delete(pkg._id);
        messages.push(`Deleted duplicate 5-session package (${pkg._id}).`);
      }
    }

    // Handle Unlimited duplicates
    if (unlimitedPackages.length > 1) {
      const [keep, ...remove] = unlimitedPackages;
      for (const pkg of remove) {
        await ctx.db.delete(pkg._id);
        messages.push(`Deleted duplicate Unlimited package (${pkg._id}).`);
      }
    }

    // Ensure we have the Unlimited package
    if (unlimitedPackages.length === 0) {
      await ctx.db.insert("packages", {
        title: "Unlimited Laser Tattoo Removal Sessions Package",
        description: "Pay one price, get the best possible results. Includes as many sessions as it takes to achieve full tattoo removal.",
        price: 35000,
        originalPrice: 60000,
        isAvailable: true,
        imageUrl: "https://www.inklessismore.ke/cdn/shop/files/Unlimited_Sessions.jpg?v=1763724845&width=1946",
        features: [
          "Unlimited sessions until removal",
          "Big savings (est. 60%)",
          "Complete removal guarantee",
          "Includes multiple tattoos",
          "VIP support",
        ],
        category: "tattoo-removal",
      });
      messages.push("Created missing Unlimited package.");
    }

    return messages.join("\n");
  },
});
