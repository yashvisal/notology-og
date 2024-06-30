import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getSubjects = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    // const userId = identity.subject;

    const subjects = await ctx.db.query("subjects").filter((q) => q.eq(q.field("userId"), identity.subject)).collect();
    
    return subjects;
  }
});

export const createSubject = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const subject = await ctx.db.insert("subjects", {
      name: args.name,
      userId,
      isArchived: false,
    });

    return subject;
  }
});
