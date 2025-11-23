import { v } from "convex/values";
import { query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { getCurrentUser } from "./users";

// Query to get user's bookings with pagination
export const getUserBookings = query({
  args: { 
    paginationOpts: paginationOptsValidator,
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bookings")
      .filter((q) => q.eq(q.field("email"), args.email))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

// Query to get all bookings (Admin only)
export const list = query({
  args: { 
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user || user.role !== "admin") {
      throw new Error("Unauthorized");
    }
    return await ctx.db
      .query("bookings")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

// Query to get a single booking by ID
export const getBookingById = query({
  args: { 
    id: v.id("bookings"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});