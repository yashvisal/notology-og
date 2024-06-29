import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  classes: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    userId: v.string(),
    isArchived: v.boolean(),
  })
  .index("by_user", ["userId"])
  .index("by_user_and_archived", ["userId", "isArchived"]),

  documents: defineTable({
    title: v.string(),
    content: v.optional(v.string()),
    userId: v.string(),
    classId: v.id("classes"),
    parentDocument: v.optional(v.id("documents")),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isArchived: v.boolean(),
    isPublished: v.boolean(),
  })
  .index("by_user", ["userId"])
  .index("by_class", ["classId"])
  .index("by_user_and_class", ["userId", "classId"])
  .index("by_parent", ["parentDocument"]),

  fileUploads: defineTable({
    fileName: v.string(),
    fileUrl: v.string(),
    fileType: v.string(),
    classId: v.id("classes"),
    userId: v.string(),
  })
  .index("by_class", ["classId"])
  .index("by_user", ["userId"]),
});
