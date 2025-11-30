import { internalMutation } from "./_generated/server";

export const fixPackages = internalMutation({
  args: {},
  handler: async (ctx) => {
    const packages = [
      {
        title: "Laser Scar Removal",
        price: 15000,
        originalPrice: 50000,
        imageUrl: "https://www.inklessismore.ke/cdn/shop/files/Laser_Scar_Removal_Package.jpg?v=1753974281&width=533",
        category: "other-laser-treatments",
        description: "Advanced scar reduction therapy using Picosecond laser technology.",
        features: ["Scar fading treatment", "Skin smoothing", "Rejuvenation therapy", "Minimal downtime"],
        isAvailable: true,
        searchTerms: ["Scar", "scar"]
      },
      {
        title: "Laser Stretch Marks Removal",
        price: 15000,
        originalPrice: 35000,
        imageUrl: "https://www.inklessismore.ke/cdn/shop/files/Laser_Stretch_Marks_Removal.jpg?v=1753974523&width=533",
        category: "other-laser-treatments",
        description: "Improves skin texture and reduces visibility of stretch marks.",
        features: ["Skin texture improvement", "Reduces stretch mark visibility", "Promotes collagen production", "Safe for all skin types"],
        isAvailable: true,
        searchTerms: ["Stretch", "stretch"]
      },
      {
        title: "Microblading/Eyebrow Tattoo Removal",
        price: 10000,
        originalPrice: 45000,
        imageUrl: "https://www.inklessismore.ke/cdn/shop/files/Copyof3sessions.jpg?v=1753972609&width=533",
        category: "other-laser-treatments",
        description: "Specialized removal for eyebrow tattoos and microblading.",
        features: ["Specialized eyebrow treatment", "Gentle and precise", "Restore natural brows", "Expert consultation included"],
        isAvailable: true,
        searchTerms: ["Eyebrow", "Microblading", "eyebrow"]
      }
    ];

    const existingPackages = await ctx.db.query("packages").collect();
    let updatedCount = 0;
    let insertedCount = 0;

    for (const pkgData of packages) {
      // Find existing package by title or partial match
      const existing = existingPackages.find(p => 
        p.title === pkgData.title || 
        pkgData.searchTerms.some(term => p.title.includes(term))
      );

      if (existing) {
        await ctx.db.patch(existing._id, {
          title: pkgData.title,
          price: pkgData.price,
          originalPrice: pkgData.originalPrice,
          imageUrl: pkgData.imageUrl,
          category: pkgData.category,
          isAvailable: true,
          description: pkgData.description,
          features: pkgData.features
        });
        updatedCount++;
      } else {
        await ctx.db.insert("packages", {
          title: pkgData.title,
          description: pkgData.description,
          price: pkgData.price,
          originalPrice: pkgData.originalPrice,
          isAvailable: true,
          features: pkgData.features,
          category: pkgData.category,
          imageUrl: pkgData.imageUrl
        });
        insertedCount++;
      }
    }

    return `Fixed packages: ${updatedCount} updated, ${insertedCount} inserted`;
  },
});
