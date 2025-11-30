import { internalMutation } from "./_generated/server";

export const updatePackages = internalMutation({
  args: {},
  handler: async (ctx) => {
    const packages = await ctx.db.query("packages").collect();

    for (const pkg of packages) {
      let updates: any = {};

      // Update category for specialized packages
      if (pkg.category === "specialized") {
        updates.category = "other-laser-treatments";
      }

      // Update specific packages
      if (pkg.title.includes("Scar Removal")) {
        updates.title = "Laser Scar Removal";
        updates.price = 15000;
        updates.originalPrice = 50000;
        updates.imageUrl = "https://www.inklessismore.ke/cdn/shop/files/Laser_Scar_Removal_Package.jpg?v=1753974281&width=533";
        updates.isAvailable = true;
        updates.category = "other-laser-treatments";
      } else if (pkg.title.includes("Stretch Mark")) {
        updates.title = "Laser Stretch Marks Removal";
        updates.price = 15000;
        updates.originalPrice = 35000;
        updates.imageUrl = "https://www.inklessismore.ke/cdn/shop/files/Laser_Stretch_Marks_Removal.jpg?v=1753974523&width=533";
        updates.isAvailable = true;
        updates.category = "other-laser-treatments";
      } else if (pkg.title.includes("Eyebrow") || pkg.title.includes("Microblading")) {
        updates.title = "Microblading/Eyebrow Tattoo Removal";
        updates.price = 10000;
        updates.originalPrice = 45000;
        updates.imageUrl = "https://www.inklessismore.ke/cdn/shop/files/Copyof3sessions.jpg?v=1753972609&width=533";
        updates.isAvailable = true;
        updates.category = "other-laser-treatments";
      }

      if (Object.keys(updates).length > 0) {
        await ctx.db.patch(pkg._id, updates);
      }
    }

    return "Packages updated successfully";
  },
});