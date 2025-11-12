import { internalMutation } from "./_generated/server";

export const seedData = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already exists
    const existingPackages = await ctx.db.query("packages").collect();
    if (existingPackages.length > 0) {
      return { message: "Data already seeded" };
    }

    // Seed packages
    await ctx.db.insert("packages", {
      title: "Single Session",
      description: "Great for trying out the process or fading a small area.",
      price: 4500,
      isAvailable: true,
      features: [
        "One laser removal session",
        "Professional consultation",
        "Aftercare guidance",
        "Safe and scar-free",
      ],
      category: "tattoo-removal",
    });

    await ctx.db.insert("packages", {
      title: "The Starter Pack (3 Sessions)",
      description: "Perfect for small tattoos or to see how your skin responds.",
      price: 10000,
      originalPrice: 13500,
      sessions: 3,
      isAvailable: true,
      features: [
        "3 laser removal sessions",
        "Save KSh 3,500",
        "Ideal for small tattoos",
        "Flexible scheduling",
        "Complete aftercare support",
      ],
      category: "tattoo-removal",
    });

    await ctx.db.insert("packages", {
      title: "The Popular Choice (5 Sessions)",
      description: "Best-seller — ideal for medium tattoos or full removal of smaller ones.",
      price: 15000,
      originalPrice: 22500,
      sessions: 5,
      isAvailable: true,
      features: [
        "5 laser removal sessions",
        "Save KSh 7,500",
        "Most popular package",
        "Visible results guaranteed",
        "Priority booking",
      ],
      category: "tattoo-removal",
    });

    await ctx.db.insert("packages", {
      title: "Complete Tattoo Removal Package",
      description: "Unlimited sessions until complete removal.",
      price: 25000,
      originalPrice: 54000,
      isAvailable: true,
      features: [
        "Unlimited sessions",
        "Save KSh 29,000",
        "Complete removal guarantee",
        "Best value for money",
        "VIP support",
      ],
      category: "tattoo-removal",
    });

    await ctx.db.insert("packages", {
      title: "Microblading/Eyebrow Tattoo Removal",
      description: "Specialized eyebrow tattoo/microblading removal.",
      price: 10000,
      originalPrice: 45000,
      isAvailable: false,
      features: [
        "Specialized eyebrow treatment",
        "Gentle and precise",
        "Restore natural brows",
        "Expert consultation included",
      ],
      category: "specialized",
    });

    await ctx.db.insert("packages", {
      title: "Laser Stretch Mark Removal",
      description: "Improves skin texture, reduces stretch marks.",
      price: 15000,
      originalPrice: 35000,
      isAvailable: false,
      features: [
        "Skin texture improvement",
        "Reduces stretch mark visibility",
        "Promotes collagen production",
        "Safe for all skin types",
      ],
      category: "specialized",
    });

    await ctx.db.insert("packages", {
      title: "Laser Scar Removal",
      description: "Fades scars, smoothens skin with rejuvenation.",
      price: 15000,
      originalPrice: 50000,
      isAvailable: false,
      features: [
        "Scar fading treatment",
        "Skin smoothing",
        "Rejuvenation therapy",
        "Minimal downtime",
      ],
      category: "specialized",
    });

    // Seed FAQs
    const faqData = [
      {
        question: "How does laser tattoo removal work?",
        answer: "Our Picosecond laser emits ultra-short bursts of energy that break down ink particles into microscopic fragments. Your body's immune system then naturally eliminates these fragments over time, gradually fading your tattoo.",
        order: 1,
      },
      {
        question: "How much does it cost?",
        answer: "Pricing starts from KSh 4,500 per session. We offer discounted multi-session packages ranging from KSh 10,000 to KSh 25,000. The exact cost depends on the size, color, and complexity of your tattoo.",
        order: 2,
      },
      {
        question: "Does it hurt?",
        answer: "The sensation is similar to getting a tattoo - a quick snapping feeling. Sessions are typically short, and numbing cream is available if needed. Most clients find it very tolerable.",
        order: 3,
      },
      {
        question: "Will it leave scars?",
        answer: "No. Our advanced Picosecond laser technology targets ink particles without damaging surrounding skin tissue, making it completely scar-free when proper aftercare is followed.",
        order: 4,
      },
      {
        question: "How long does complete removal take?",
        answer: "Most tattoos require 5-12 sessions for complete removal, spaced 4-6 weeks apart. Factors like tattoo age, ink colors, location, and your immune system affect the timeline.",
        order: 5,
      },
      {
        question: "Where are you located?",
        answer: "We're located at Two Rivers Mall, 1st Floor, Nairobi, Kenya. You can reach us at +254 708 901 505 or info@inklessismore.ke",
        order: 6,
      },
    ];

    for (const faq of faqData) {
      await ctx.db.insert("faqs", faq);
    }

    return { message: "Database seeded successfully" };
  },
});
