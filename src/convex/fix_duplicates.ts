import { internalMutation } from "./_generated/server";

export const fixDuplicates = internalMutation({
  args: {},
  handler: async (ctx) => {
    const packages = await ctx.db.query("packages").collect();
    
    const fiveSessionPackages = packages.filter(p => 
      p.title.includes("5 Laser Tattoo Removal Sessions") || 
      (p.sessions === 5 && p.price === 20000)
    );

    const unlimitedPackages = packages.filter(p => 
      p.title.includes("Unlimited") || 
      p.price === 35000
    );

    let messages: string[] = [];

    // Case 1: We have duplicates of 5 sessions and missing Unlimited
    if (fiveSessionPackages.length >= 2 && unlimitedPackages.length === 0) {
      // Take the last one and convert it to Unlimited
      const pkgToConvert = fiveSessionPackages[fiveSessionPackages.length - 1];
      
      await ctx.db.replace(pkgToConvert._id, {
        title: "Unlimited Laser Tattoo Removal Sessions Package",
        description: "Pay one price, get the best possible results. Includes as many sessions as it takes to achieve full tattoo removal.",
        price: 35000,
        originalPrice: 60000,
        // sessions field omitted to be undefined
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
      messages.push(`Converted duplicate 5-session package (${pkgToConvert._id}) to Unlimited package.`);
    } 
    // Case 2: We have duplicates of 5 sessions AND we have Unlimited (just delete extra 5 sessions)
    else if (fiveSessionPackages.length >= 2 && unlimitedPackages.length > 0) {
      // Keep the first one, delete the rest
      const [keep, ...remove] = fiveSessionPackages;
      for (const pkg of remove) {
        await ctx.db.delete(pkg._id);
        messages.push(`Deleted duplicate 5-session package (${pkg._id}).`);
      }
    }
    // Case 3: Missing Unlimited entirely (and no duplicate to convert)
    else if (unlimitedPackages.length === 0) {
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

    // Case 4: Duplicate Unlimited packages
    if (unlimitedPackages.length > 1) {
      const [keep, ...remove] = unlimitedPackages;
      for (const pkg of remove) {
        await ctx.db.delete(pkg._id);
        messages.push(`Deleted duplicate Unlimited package (${pkg._id}).`);
      }
    }

    // Ensure the remaining 5 session package is correct
    const remainingFiveSession = await ctx.db.query("packages").collect();
    const correctFiveSession = remainingFiveSession.find(p => p.title.includes("5 Laser Tattoo Removal Sessions"));
    if (correctFiveSession) {
       await ctx.db.patch(correctFiveSession._id, {
          title: "5 Laser Tattoo Removal Sessions (medium size tattoo)",
          description: "Our most popular package. Big saving, big results. Ideal for medium size tattoos.",
          price: 20000,
          originalPrice: 25000,
          sessions: 5,
          isAvailable: true,
          imageUrl: "https://www.inklessismore.ke/cdn/shop/files/5_Sessions.jpg?v=1763724687&width=1946",
          features: [
            "5 laser removal sessions",
            "Save KSh 5,000",
            "Most popular package",
            "Visible results guaranteed",
            "Priority booking",
          ],
          category: "tattoo-removal",
       });
       messages.push("Ensured 5-session package details are correct.");
    }

    return messages.join("\n");
  },
});
