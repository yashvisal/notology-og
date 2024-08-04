import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'us-west-1',
});

const s3 = new AWS.S3();

export async function POST(request: Request) {
  try {
    const { name, type, namespace } = await request.json();

    if (!namespace) {
      return NextResponse.json(
        { message: 'Namespace is required' },
        { status: 400 }
      );
    }

    const fileParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `uploads/${namespace}/${Date.now()}-${name}`,
      Expires: 600,
      ContentType: type,
    };

    const uploadUrl = await s3.getSignedUrlPromise('putObject', fileParams);

    return NextResponse.json({
      uploadUrl,
      key: fileParams.Key,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: 'Error generating upload URL', error: String(error) },
      { status: 500 }
    );
  }
}