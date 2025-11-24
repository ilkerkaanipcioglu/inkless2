import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const setAdmin = internalMutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!user) {
      console.log(`User with email ${args.email} not found`);
      return;
    }

    await ctx.db.patch(user._id, { role: "admin" });
    console.log(`Successfully set ${args.email} as admin`);
  },
});
