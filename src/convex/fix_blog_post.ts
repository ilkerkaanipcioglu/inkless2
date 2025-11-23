import { internalMutation } from "./_generated/server";

export const fixTestimonialPost = internalMutation({
  args: {},
  handler: async (ctx) => {
    const slug = "let-your-skin-shine-again-client-testimonials";
    const post = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    if (!post) {
      console.log("Post not found");
      return;
    }

    // Remove the image markdown
    const newContent = post.content.replace(
      "![Let Your Skin Shine Again](https://harmless-tapir-303.convex.cloud/api/storage/7427e76d-97f4-45d9-b794-a61807aec078)",
      ""
    );

    await ctx.db.patch(post._id, {
      content: newContent,
    });

    console.log("Post updated");
  },
});
