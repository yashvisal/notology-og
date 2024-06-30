import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  subjects: defineTable({
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
    subjectId: v.id("subjects"),
    parentDocument: v.optional(v.id("documents")),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isArchived: v.boolean(),
    isPublished: v.boolean(),
  })
  .index("by_user", ["userId"])
  .index("by_subject", ["subjectId"])
  .index("by_user_and_subject", ["userId", "subjectId"])
  .index("by_parent", ["parentDocument"]),

  fileUploads: defineTable({
    fileName: v.string(),
    fileUrl: v.string(),
    fileType: v.string(),
    subjectId: v.id("subjects"),
    userId: v.string(),
  })
  .index("by_subject", ["subjectId"])
  .index("by_user", ["userId"]),
});
