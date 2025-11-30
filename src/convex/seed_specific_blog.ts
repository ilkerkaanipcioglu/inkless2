import { internalMutation } from "./_generated/server";

export const seedBlogPost = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Try to find an admin user or any user to be the author
    const user = await ctx.db.query("users").first();
    let authorId;
    
    if (!user) {
      // Create a dummy user if none exists
      authorId = await ctx.db.insert("users", {
        name: "Inkless Admin",
        email: "admin@inklessismore.ke",
        role: "admin",
      });
    } else {
      authorId = user._id;
    }

    const slug = "just-undo-it-nairobi-leading-laser-tattoo-removal";
    const existing = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    if (existing) {
      console.log("Blog post already exists, updating...");
      await ctx.db.patch(existing._id, {
         title: "Just Undo It: Nairobi's Premier Laser Tattoo Removal",
         excerpt: "Experience the freedom of clear skin with Inkless Is More. We combine advanced Picosecond technology with expert care to deliver safe, scar-free tattoo removal results.",
         content: `
<h2>Just Undo It.</h2>
<p>Regret is a thing of the past. At <strong>Inkless Is More</strong>, we believe that your skin should reflect who you are today, not who you were yesterday. As Nairobi's leading laser tattoo removal studio, we are dedicated to helping you "Just Undo It" safely and effectively.</p>

<h3>Why We Are Nairobi's Leader</h3>
<p>Located conveniently at Two Rivers Mall, we utilize state-of-the-art <strong>Picosecond laser technology</strong>. Unlike older lasers that rely on heat and can damage surrounding tissue, our technology uses ultra-short pulses to shatter ink particles into dust-like fragments, which your body naturally eliminates.</p>

<h3>The Inkless Difference</h3>
<ul>
  <li><strong>Safety First:</strong> Our protocols are designed to protect your skin integrity, ensuring scar-free results.</li>
  <li><strong>All Skin Types:</strong> We specialize in treating all skin tones safely and effectively.</li>
  <li><strong>Faster Results:</strong> Our advanced technology often requires fewer sessions than traditional methods.</li>
</ul>

<p>Whether you're looking to fade a tattoo for a cover-up or remove it completely, our team of certified specialists is here to guide you through every step of the journey.</p>

<p>Ready to start? <strong>Just Undo It.</strong> Book your free consultation today.</p>
      `,
         imageUrl: "https://harmless-tapir-303.convex.cloud/api/storage/064ce72b-b70d-4359-8497-f37c4409994d",
         published: true,
      });
      return;
    }

    await ctx.db.insert("blogPosts", {
      title: "Just Undo It: Nairobi's Premier Laser Tattoo Removal",
      slug: slug,
      excerpt: "Experience the freedom of clear skin with Inkless Is More. We combine advanced Picosecond technology with expert care to deliver safe, scar-free tattoo removal results.",
      content: `
        <h2>Just Undo It.</h2>
        <p>Regret is a thing of the past. At <strong>Inkless Is More</strong>, we believe that your skin should reflect who you are today, not who you were yesterday. As Nairobi's leading laser tattoo removal studio, we are dedicated to helping you "Just Undo It" safely and effectively.</p>
        
        <h3>Why We Are Nairobi's Leader</h3>
        <p>Located conveniently at Two Rivers Mall, we utilize state-of-the-art <strong>Picosecond laser technology</strong>. Unlike older lasers that rely on heat and can damage surrounding tissue, our technology uses ultra-short pulses to shatter ink particles into dust-like fragments, which your body naturally eliminates.</p>
        
        <h3>The Inkless Difference</h3>
        <ul>
          <li><strong>Safety First:</strong> Our protocols are designed to protect your skin integrity, ensuring scar-free results.</li>
          <li><strong>All Skin Types:</strong> We specialize in treating all skin tones safely and effectively.</li>
          <li><strong>Faster Results:</strong> Our advanced technology often requires fewer sessions than traditional methods.</li>
        </ul>
        
        <p>Whether you're looking to fade a tattoo for a cover-up or remove it completely, our team of certified specialists is here to guide you through every step of the journey.</p>
        
        <p>Ready to start? <strong>Just Undo It.</strong> Book your free consultation today.</p>
      `,
      imageUrl: "https://harmless-tapir-303.convex.cloud/api/storage/064ce72b-b70d-4359-8497-f37c4409994d",
      published: true,
      authorId: authorId,
    });
    
    console.log("Blog post created successfully");
  },
});
