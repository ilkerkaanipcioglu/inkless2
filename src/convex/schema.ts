import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    packages: defineTable({
      title: v.string(),
      description: v.string(),
      price: v.number(),
      originalPrice: v.optional(v.number()),
      sessions: v.optional(v.number()),
      isAvailable: v.boolean(),
      features: v.array(v.string()),
      category: v.string(),
    }),

    gallery: defineTable({
      title: v.string(),
      description: v.string(),
      beforeImageUrl: v.string(),
      afterImageUrl: v.string(),
      sessions: v.number(),
      category: v.string(),
    }),

    blogPosts: defineTable({
      title: v.string(),
      slug: v.string(),
      excerpt: v.string(),
      content: v.string(),
      imageUrl: v.optional(v.string()),
      published: v.boolean(),
      authorId: v.id("users"),
    }).index("by_slug", ["slug"]),

    faqs: defineTable({
      question: v.string(),
      answer: v.string(),
      order: v.number(),
    }),

    contacts: defineTable({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      message: v.optional(v.string()),
      type: v.string(),
      status: v.string(),
      packageId: v.optional(v.id("packages")),
      sessions: v.optional(v.array(v.object({
        date: v.optional(v.string()),
        time: v.optional(v.string()),
      }))),
    }),
  },
  {
    schemaValidation: false,
  },
);

export default schema;