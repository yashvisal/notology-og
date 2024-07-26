import { NextApiRequest, NextApiResponse } from 'next';
import { S3Loader } from "@langchain/community/document_loaders/web/s3";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { fileId } = req.body;

  if (!fileId) {
    return res.status(400).json({ message: 'fileId is required' });
  }

  try {
    const loader = new S3Loader({
      bucket: process.env.S3_BUCKET_NAME!,
      key: fileId,
      s3Config: {
        region: "us-west-2",
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
      },
      unstructuredAPIURL: process.env.UNSTRUCTURED_API_URL!,
      unstructuredAPIKey: process.env.UNSTRUCTURED_API_KEY!
    });

    const docs = await loader.load();
    res.status(200).json(docs);
  } catch (error) {
    console.error("Error loading document:", error);
    res.status(500).json({ message: 'Error loading document', error: String(error) });
  }
}