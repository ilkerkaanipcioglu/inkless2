import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    message: v.optional(v.string()),
    type: v.string(),
    packageId: v.optional(v.id("packages")),
    sessions: v.optional(v.array(v.object({
      date: v.optional(v.string()),
      time: v.optional(v.string()),
    }))),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contacts", { ...args, status: "new" });
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user || (user.role !== "admin" && user.role !== "member")) {
      throw new Error("Unauthorized");
    }
    return await ctx.db.query("contacts").order("desc").collect();
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("contacts"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user || (user.role !== "admin" && user.role !== "member")) {
      throw new Error("Unauthorized");
    }
    return await ctx.db.patch(args.id, { status: args.status });
  },
});
