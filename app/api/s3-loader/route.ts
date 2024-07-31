import { NextResponse } from 'next/server';
import { S3Loader } from "@langchain/community/document_loaders/web/s3";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { s3Key } = body;

    if (!s3Key) {
      return NextResponse.json({ message: 's3Key is required' }, { status: 400 });
    }

    // Check if S3_BUCKET_NAME is set
    if (!process.env.NEXT_PUBLIC_S3_BUCKET_NAME) {
      throw new Error("NEXT_PUBLIC_S3_BUCKET_NAME environment variable is not set");
    }

    const loader = new S3Loader({
      bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      key: s3Key,
      s3Config: {
        region: "us-west-1",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      },
      unstructuredAPIURL: process.env.NEXT_PUBLIC_UNSTRUCTURED_API_URL!,
      unstructuredAPIKey: process.env.NEXT_PUBLIC_UNSTRUCTURED_API_KEY!,
    });

    const docs = await loader.load();

    return NextResponse.json(docs);
  } catch (error) {    
    return NextResponse.json({ message: 'Error loading document', error: String(error) }, { status: 500 });
  }
}