import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
// import { internal } from "./_generated/api"; // TODO: Uncomment when email feature is ready
import { getCurrentUser } from "./users";

// Query to get available time slots for a specific date
export const getAvailableSlots = query({
  args: { 
    date: v.string(), // Format: "YYYY-MM-DD"
  },
  handler: async (ctx, args) => {
    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_date", (q) => q.eq("date", args.date))
      .collect();

    // Define business hours (9 AM to 6 PM, 30-minute slots)
    const allSlots = [
      "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
      "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
      "16:00", "16:30", "17:00", "17:30"
    ];

    // Get booked slots for this date
    const bookedSlots = bookings
      .filter(b => b.status === "confirmed" || b.status === "pending")
      .map(b => b.time);

    // Return available slots
    return allSlots.map(slot => ({
      time: slot,
      available: !bookedSlots.includes(slot),
      booked: bookedSlots.includes(slot)
    }));
  },
});

// Query to get all bookings (admin only)
export const listBookings = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user || (user.role !== "admin" && user.role !== "member")) {
      throw new Error("Unauthorized");
    }
    return await ctx.db.query("bookings").order("desc").collect();
  },
});

// Mutation to create a booking with conflict prevention
export const createBooking = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    date: v.string(),
    time: v.string(),
    packageId: v.optional(v.id("packages")),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if slot is still available (prevent double-booking)
    const existingBooking = await ctx.db
      .query("bookings")
      .withIndex("by_date_and_time", (q) => 
        q.eq("date", args.date).eq("time", args.time)
      )
      .filter((q) => 
        q.or(
          q.eq(q.field("status"), "confirmed"),
          q.eq(q.field("status"), "pending")
        )
      )
      .first();

    if (existingBooking) {
      throw new Error("This time slot is no longer available. Please select another time.");
    }

    // Get package details for email
    let packageTitle = undefined;
    if (args.packageId) {
      const pkg = await ctx.db.get(args.packageId);
      packageTitle = pkg?.title;
    }

    // Create the booking
    const bookingId = await ctx.db.insert("bookings", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      date: args.date,
      time: args.time,
      packageId: args.packageId,
      message: args.message,
      status: "confirmed",
      type: "booking",
    });

    // TODO: Email confirmation will be implemented later
    // await ctx.scheduler.runAfter(
    //   0,
    //   internal.sendEmails.sendBookingConfirmation,
    //   {
    //     to: args.email,
    //     name: args.name,
    //     date: args.date,
    //     time: args.time,
    //     packageTitle,
    //   }
    // );

    return bookingId;
  },
});

// Mutation to update booking status (admin only)
export const updateBookingStatus = mutation({
  args: {
    id: v.id("bookings"),
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

// Mutation to cancel a booking
export const cancelBooking = mutation({
  args: {
    id: v.id("bookings"),
  },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.id);
    if (!booking) {
      throw new Error("Booking not found");
    }
    return await ctx.db.patch(args.id, { status: "cancelled" });
  },
});