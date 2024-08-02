import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFile = mutation({
  args: { 
    fileName: v.string(), 
    fileId: v.string(), 
    subjectId: v.id("subjects"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;

    const fileId = await ctx.db.insert("fileUploads", {
      fileName: args.fileName,
      fileId: args.fileId,
      subjectId: args.subjectId,
      userId,
    });
    
    return fileId;
  },
});

// export const processDocument = mutation({
//   args: { fileId: v.string() },
//   handler: async (ctx, args) => {
//     return args.fileId;
//   }
// });

export const getFilesBySubject = query({
  args: { subjectId: v.id("subjects"), userId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const files = await ctx.db
      .query("fileUploads")
      .withIndex("by_user_and_subject", (q) => 
        q.eq("userId", userId).eq("subjectId", args.subjectId)
      )
      .collect();
    return files;
  }
});

// New query to get file details
export const getFile = query({
  args: { fileId: v.id("fileUploads") },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args.fileId);
    return file;
  },
});