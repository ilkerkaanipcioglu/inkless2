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
      title: "1 Single Laser Tattoo Removal Session",
      description: "Our 'pay-per-session' option offers flexibility to the ones willing to fade their tattoos away at their own pace. No colossal saving, no engagement, no rush.",
      price: 5000,
      isAvailable: true,
      features: [
        "One laser removal session",
        "Professional consultation",
        "Aftercare guidance",
        "Safe and scar-free",
        "4-week recovery interval",
      ],
      category: "tattoo-removal",
      imageUrl: "https://www.inklessismore.ke/cdn/shop/files/Single_Session.jpg?v=1763724288&width=1946",
    });

    await ctx.db.insert("packages", {
      title: "2 Laser Tattoo Removal Sessions (small size tattoo)",
      description: "Perfect for small tattoos or to see how your skin responds. Very likely to completely remove any small or thin tattoo.",
      price: 9000,
      originalPrice: 10000,
      sessions: 2,
      isAvailable: true,
      features: [
        "2 laser removal sessions",
        "Save KSh 1,000",
        "Ideal for small/thin tattoos",
        "Flexible scheduling",
        "Complete aftercare support",
      ],
      category: "tattoo-removal",
      imageUrl: "https://www.inklessismore.ke/cdn/shop/files/2_Sessions_3948d9a6-f510-4678-b0fe-21d017bcd5dd.jpg?v=1763727082&width=1946",
    });

    await ctx.db.insert("packages", {
      title: "5 Laser Tattoo Removal Sessions (medium size tattoo)",
      description: "Our most popular package. Big saving, big results. Ideal for medium size tattoos.",
      price: 20000,
      originalPrice: 25000,
      sessions: 5,
      isAvailable: true,
      features: [
        "5 laser removal sessions",
        "Save KSh 5,000",
        "Most popular package",
        "Visible results guaranteed",
        "Priority booking",
      ],
      category: "tattoo-removal",
      imageUrl: "https://www.inklessismore.ke/cdn/shop/files/5_Sessions.jpg?v=1763724687&width=1946",
    });

    await ctx.db.insert("packages", {
      title: "Unlimited Laser Tattoo Removal Sessions Package",
      description: "Pay one price, get the best possible results. Includes as many sessions as it takes to achieve full tattoo removal.",
      price: 35000,
      originalPrice: 60000,
      isAvailable: true,
      features: [
        "Unlimited sessions until removal",
        "Big savings (est. 60%)",
        "Complete removal guarantee",
        "Includes multiple tattoos",
        "VIP support",
      ],
      category: "tattoo-removal",
      imageUrl: "https://www.inklessismore.ke/cdn/shop/files/Unlimited_Sessions.jpg?v=1763724845&width=1946",
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
        answer: "Pricing starts from KSh 5,000 per session. We offer discounted multi-session packages ranging from KSh 9,000 to KSh 35,000. The exact cost depends on the size, color, and complexity of your tattoo.",
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
        answer: "On average, it takes 3-12 sessions to completely remove a tattoo, spaced 4-6 weeks apart. Factors like tattoo age, ink colors, location, and your immune system affect the timeline.",
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

    // Create a dummy admin user for blog posts
    const adminUser = await ctx.db.insert("users", {
      name: "Inkless Team",
      email: "admin@inklessismore.ke",
      role: "admin",
    });

    // Seed blog posts
    await ctx.db.insert("blogPosts", {
      title: "Join Our Ambassador Program: Earn While You Share",
      slug: "ambassador-program-launch",
      excerpt: "Become an Inkless Is More Ambassador and earn commissions while helping others discover the freedom of clear skin. Learn about our exciting new program with exclusive benefits.",
      content: `# Join Our Ambassador Program

We're thrilled to announce the launch of the Inkless Is More Ambassador Program! This is your opportunity to be part of Kenya's leading tattoo removal revolution while earning attractive commissions.

## What is the Ambassador Program?

Our Ambassador Program is designed for passionate individuals who want to share the transformative power of laser tattoo removal with their community. Whether you're a beauty influencer, wellness advocate, or simply someone who believes in our mission, this program is for you.

## Program Benefits

### Earn Generous Commissions
- Earn up to 15% commission on every successful referral
- No cap on earnings - the more you refer, the more you earn
- Fast payment processing within 7 days

### Exclusive Training
- Free comprehensive training on laser tattoo removal
- Access to educational materials and resources
- Regular updates on the latest techniques and technology

### Marketing Support
- Professional marketing materials provided
- Social media content templates
- Dedicated ambassador portal with tracking tools

### Special Perks
- Exclusive discounts for you and your referrals
- Priority booking for your clients
- VIP access to new services and promotions

## Who Can Join?

We're looking for:
- Beauty and wellness professionals
- Social media influencers and content creators
- Healthcare professionals
- Anyone passionate about helping others

## How It Works

1. **Apply**: Fill out our simple application form
2. **Get Trained**: Complete our online training program
3. **Start Referring**: Share your unique referral code
4. **Earn Rewards**: Get paid for every successful booking

## Ready to Get Started?

Visit our Training page or contact us at info@inklessismore.ke to learn more about becoming an Inkless Is More Ambassador.

Together, let's help more people rediscover their confidence and embrace clear, beautiful skin!`,
      imageUrl: "https://harmless-tapir-303.convex.cloud/api/storage/2645f8db-e50b-48c1-b891-e120118b0715",
      published: true,
      authorId: adminUser,
    });

    await ctx.db.insert("blogPosts", {
      title: "Limited Time Offer: Save Up to KSh 29,000 on Removal Packages",
      slug: "special-discount-packages",
      excerpt: "Don't miss out! Our biggest savings ever on multi-session packages. Get professional laser tattoo removal at unbeatable prices. Book now before this offer ends!",
      content: `# Exclusive Discount: Your Journey to Clear Skin Starts Now

For a limited time only, we're offering our biggest discounts ever on laser tattoo removal packages. This is your chance to finally say goodbye to that unwanted ink at prices that won't break the bank.

## Special Package Pricing

### The Starter Pack (2 Sessions)
**Was: KSh 10,000 | Now: KSh 9,000**
- Save KSh 1,000
- Perfect for small tattoos
- Ideal for first-time clients

### The Popular Choice (5 Sessions)
**Was: KSh 25,000 | Now: KSh 20,000**
- Save KSh 5,000
- Our best-selling package
- Great for medium-sized tattoos

### Complete Removal Package
**Was: KSh 60,000 | Now: KSh 35,000**
- Save KSh 25,000 - Our biggest discount!
- Unlimited sessions until complete removal
- Best value for money

## Why Choose Inkless Is More?

### Advanced Technology
We use the latest Picosecond laser technology, which is:
- Faster and more effective than traditional lasers
- Completely scar-free
- Suitable for all skin types
- Minimal downtime

### Expert Care
- Certified and experienced technicians
- Free consultation included
- Personalized treatment plans
- Comprehensive aftercare support

### Convenient Location
Located at Two Rivers Mall, 1st Floor - easy to access with ample parking and a comfortable, private treatment environment.

## What Our Clients Say

"I was amazed at how quickly my tattoo faded. The team was professional, and the process was much less painful than I expected!" - Sarah M.

"Best decision I ever made. The package deal made it affordable, and the results speak for themselves." - James K.

## How to Claim This Offer

1. **Book Your Free Consultation**: Call us at +254 708 901 505 or book online
2. **Choose Your Package**: Our experts will recommend the best option for your needs
3. **Start Your Journey**: Begin your transformation to clear, confident skin

## Terms & Conditions

- Offer valid for new bookings only
- Packages must be purchased upfront
- Sessions must be completed within 12 months
- Cannot be combined with other offers
- Subject to availability

## Don't Wait - Book Today!

This special pricing won't last forever. Take advantage of these incredible savings and start your journey to clear skin today.

**Contact us now:**
- Phone: +254 708 901 505
- Email: info@inklessismore.ke
- Visit: Two Rivers Mall, 1st Floor, Nairobi

Your new beginning is just one call away!`,
      imageUrl: "https://harmless-tapir-303.convex.cloud/api/storage/08647076-bb2b-45e1-a230-3adf8c90a821",
      published: true,
      authorId: adminUser,
    });

    return { message: "Database seeded successfully with blog posts" };
  },
});

export const seedBlogPosts = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Check if blog posts already exist
    const existingPosts = await ctx.db.query("blogPosts").collect();
    if (existingPosts.length > 0) {
      return { message: "Blog posts already exist" };
    }

    // Create a dummy admin user for blog posts
    const existingAdmin = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), "admin@inklessismore.ke"))
      .first();

    const adminUser = existingAdmin?._id || await ctx.db.insert("users", {
      name: "Inkless Team",
      email: "admin@inklessismore.ke",
      role: "admin",
    });

    // Seed blog posts
    await ctx.db.insert("blogPosts", {
      title: "Join Our Ambassador Program: Earn While You Share",
      slug: "ambassador-program-launch",
      excerpt: "Become an Inkless Is More Ambassador and earn commissions while helping others discover the freedom of clear skin. Learn about our exciting new program with exclusive benefits.",
      content: `# Join Our Ambassador Program

We're thrilled to announce the launch of the Inkless Is More Ambassador Program! This is your opportunity to be part of Kenya's leading tattoo removal revolution while earning attractive commissions.

## What is the Ambassador Program?

Our Ambassador Program is designed for passionate individuals who want to share the transformative power of laser tattoo removal with their community. Whether you're a beauty influencer, wellness advocate, or simply someone who believes in our mission, this program is for you.

## Program Benefits

### Earn Generous Commissions
- Earn up to 15% commission on every successful referral
- No cap on earnings - the more you refer, the more you earn
- Fast payment processing within 7 days

### Exclusive Training
- Free comprehensive training on laser tattoo removal
- Access to educational materials and resources
- Regular updates on the latest techniques and technology

### Marketing Support
- Professional marketing materials provided
- Social media content templates
- Dedicated ambassador portal with tracking tools

### Special Perks
- Exclusive discounts for you and your referrals
- Priority booking for your clients
- VIP access to new services and promotions

## Who Can Join?

We're looking for:
- Beauty and wellness professionals
- Social media influencers and content creators
- Healthcare professionals
- Anyone passionate about helping others

## How It Works

1. **Apply**: Fill out our simple application form
2. **Get Trained**: Complete our online training program
3. **Start Referring**: Share your unique referral code
4. **Earn Rewards**: Get paid for every successful booking

## Ready to Get Started?

Visit our Training page or contact us at info@inklessismore.ke to learn more about becoming an Inkless Is More Ambassador.

Together, let's help more people rediscover their confidence and embrace clear, beautiful skin!`,
      imageUrl: "https://harmless-tapir-303.convex.cloud/api/storage/2645f8db-e50b-48c1-b891-e120118b0715",
      published: true,
      authorId: adminUser,
    });

    await ctx.db.insert("blogPosts", {
      title: "Limited Time Offer: Save Up to KSh 29,000 on Removal Packages",
      slug: "special-discount-packages",
      excerpt: "Don't miss out! Our biggest savings ever on multi-session packages. Get professional laser tattoo removal at unbeatable prices. Book now before this offer ends!",
      content: `# Exclusive Discount: Your Journey to Clear Skin Starts Now

For a limited time only, we're offering our biggest discounts ever on laser tattoo removal packages. This is your chance to finally say goodbye to that unwanted ink at prices that won't break the bank.

## Special Package Pricing

### The Starter Pack (2 Sessions)
**Was: KSh 10,000 | Now: KSh 9,000**
- Save KSh 1,000
- Perfect for small tattoos
- Ideal for first-time clients

### The Popular Choice (5 Sessions)
**Was: KSh 25,000 | Now: KSh 20,000**
- Save KSh 5,000
- Our best-selling package
- Great for medium-sized tattoos

### Complete Removal Package
**Was: KSh 60,000 | Now: KSh 35,000**
- Save KSh 25,000 - Our biggest discount!
- Unlimited sessions until complete removal
- Best value for money

## Why Choose Inkless Is More?

### Advanced Technology
We use the latest Picosecond laser technology, which is:
- Faster and more effective than traditional lasers
- Completely scar-free
- Suitable for all skin types
- Minimal downtime

### Expert Care
- Certified and experienced technicians
- Free consultation included
- Personalized treatment plans
- Comprehensive aftercare support

### Convenient Location
Located at Two Rivers Mall, 1st Floor - easy to access with ample parking and a comfortable, private treatment environment.

## What Our Clients Say

"I was amazed at how quickly my tattoo faded. The team was professional, and the process was much less painful than I expected!" - Sarah M.

"Best decision I ever made. The package deal made it affordable, and the results speak for themselves." - James K.

## How to Claim This Offer

1. **Book Your Free Consultation**: Call us at +254 708 901 505 or book online
2. **Choose Your Package**: Our experts will recommend the best option for your needs
3. **Start Your Journey**: Begin your transformation to clear, confident skin

## Terms & Conditions

- Offer valid for new bookings only
- Packages must be purchased upfront
- Sessions must be completed within 12 months
- Cannot be combined with other offers
- Subject to availability

## Don't Wait - Book Today!

This special pricing won't last forever. Take advantage of these incredible savings and start your journey to clear skin today.

**Contact us now:**
- Phone: +254 708 901 505
- Email: info@inklessismore.ke
- Visit: Two Rivers Mall, 1st Floor, Nairobi

Your new beginning is just one call away!`,
      imageUrl: "https://harmless-tapir-303.convex.cloud/api/storage/08647076-bb2b-45e1-a230-3adf8c90a821",
      published: true,
      authorId: adminUser,
    });

    return { message: "Blog posts seeded successfully" };
  },
});