import { NextResponse } from 'next/server';
import axios from 'axios';
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";

const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8001';

export async function POST(request: Request) {
  try {   
    const body = await request.json();
    const { fileIds, processingId } = body;

    if (!Array.isArray(fileIds) || fileIds.length === 0) {
      throw new Error("No file IDs provided");
    }

    const processFile = async (fileId: Id<"fileUploads">) => {
      try {        
        const file = await fetchQuery(api.files.getFile, { fileId });
        if (!file) {
          throw new Error(`File not found for fileId: ${fileId}`);
        }

        const s3_key = file.fileId;
        const namespace = file.namespace;

        if (!s3_key || !namespace) {
          throw new Error(`S3 key or namespace missing for fileId: ${fileId}`);
        }

        await axios.post(`${FASTAPI_URL}/ingest`, { s3_key, namespace });
        
        console.log(`Ingestion successful for fileId: ${fileId}`);
        return { fileId, success: true };
      } catch (error) {
        console.error(`Ingestion failed for fileId: ${fileId}:`, error);
        return { fileId, success: false, error: String(error) };
      }
    };

    const results = await Promise.all(fileIds.map(fileId => processFile(fileId as Id<"fileUploads">)));

    return NextResponse.json({
      success: true, 
      message: "File processing initiated", 
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