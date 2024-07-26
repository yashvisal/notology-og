import { NextResponse } from 'next/server';
import axios from 'axios';
import { api } from "@/convex/_generated/api";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fileIds, processingId } = body;

    if (!Array.isArray(fileIds) || fileIds.length === 0) {
      throw new Error("No file IDs provided");
    }

    const processFile = async (fileId: Id<"fileUploads">) => {
      try {        
        // Get the file information from Convex
        const file = await fetchQuery(api.files.getFile, { fileId });
        if (!file) {
          throw new Error(`File not found for fileId: ${fileId}`);
        }

        const s3Key = file.fileId;

        if (!s3Key) {
          throw new Error(`S3 key missing for fileId: ${fileId}`);
        }

        const s3LoaderUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/s3-loader`;
        const s3Response = await axios.post(s3LoaderUrl, { s3Key });
        const docs = s3Response.data;

        await fetchMutation(api.files.updateFileContent, { fileId, content: JSON.stringify(docs) });
        
        return { fileId, success: true };
      } catch (error) {
        return { fileId, success: false, error: String(error) };
      }
    };

    const results = await Promise.all(fileIds.map(fileId => processFile(fileId as Id<"fileUploads">)));

    return NextResponse.json({ 
      success: true, 
      message: "File processing completed", 
      results,
      processingId 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: "Error in file processing", 
        error: String(error),
        stack: error instanceof Error ? error.stack : undefined
      }, 
      { status: 500 }
    );
  }
}