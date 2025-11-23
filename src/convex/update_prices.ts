import { internalMutation } from "./_generated/server";

export const updatePackages = internalMutation({
  args: {},
  handler: async (ctx) => {
    const packages = await ctx.db.query("packages").collect();

    for (const pkg of packages) {
      if (pkg.title === "Single Session") {
        await ctx.db.patch(pkg._id, {
          price: 5000,
        });
      } else if (pkg.title.includes("Starter Pack") || pkg.sessions === 3) {
        // Convert 3 sessions to 2 sessions
        await ctx.db.patch(pkg._id, {
          title: "The Starter Pack (2 Sessions)",
          price: 9000,
          originalPrice: 10000,
          sessions: 2,
          features: [
            "2 laser removal sessions",
            "Save KSh 1,000",
            "Ideal for small tattoos",
            "Flexible scheduling",
            "Complete aftercare support",
          ],
        });
      } else if (pkg.title.includes("Popular Choice") || pkg.sessions === 5) {
        await ctx.db.patch(pkg._id, {
          price: 20000,
          originalPrice: 25000,
          features: [
            "5 laser removal sessions",
            "Save KSh 5,000",
            "Most popular package",
            "Visible results guaranteed",
            "Priority booking",
          ],
        });
      } else if (pkg.title.includes("Complete Tattoo Removal")) {
        await ctx.db.patch(pkg._id, {
          price: 35000,
          originalPrice: 60000,
          features: [
            "Unlimited sessions",
            "Big savings for multiple sessions",
            "Complete removal guarantee",
            "Best value for money",
            "VIP support",
          ],
        });
      }
    }

    // Update FAQs in DB as well
    const faqs = await ctx.db.query("faqs").collect();
    for (const faq of faqs) {
      if (faq.question === "How much does it cost?") {
        await ctx.db.patch(faq._id, {
          answer: "Pricing starts from KSh 5,000 per session. We offer discounted multi-session packages ranging from KSh 9,000 to KSh 35,000. The exact cost depends on the size, color, and complexity of your tattoo.",
        });
      } else if (faq.question === "How long does complete removal take?") {
        await ctx.db.patch(faq._id, {
          answer: "On average, it takes 3-12 sessions to completely remove a tattoo, spaced 4-6 weeks apart. Factors like tattoo age, ink colors, location, and your immune system affect the timeline.",
        });
      }
    }

    return "Packages and FAQs updated successfully";
  },
});
