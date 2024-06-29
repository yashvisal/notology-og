import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createClass = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const newClass = await ctx.db.insert("classes", {
      name: args.name,
      description: args.description,
      userId,
      isArchived: false,
    });

    return newClass;
  }
});
