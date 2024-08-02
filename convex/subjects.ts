import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getSubject = query({
  args: { subjectId: v.id("subjects") },
  handler: async (ctx, args) => {
    const subject = await ctx.db.get(args.subjectId);
    if (!subject) {
      throw new Error("Subject not found");
    }
    return subject;
  }
});

export const getSubjects = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const subjects = await ctx.db
    .query("subjects")
    .filter((q) => q.eq(q.field("userId"), userId))
    .collect();
    
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
      namespace: "",
    });

    return subject;
  }
});
