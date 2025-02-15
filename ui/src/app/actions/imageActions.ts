"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadImage(prevState: any, formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) return { error: "No file uploaded." };

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileKey = `uploads/${randomUUID()}-${file.name}`;

    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileKey,
      Body: buffer,
      ContentType: file.type,
    };

    const response = await s3.send(new PutObjectCommand(uploadParams));
    console.log("response", response);
    const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${fileKey}`;
    // Optional: Revalidate any pages that depend on uploaded images
    revalidatePath("/markdownEditor");

    return { success: true, imageUrl };
  } catch (error) {
    console.log("error", error);
    return { error: "Upload failed." };
  }
}
