import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (
  baseImageUrl: string
): Promise<string | null> => {
  
  if (!baseImageUrl) return null;

  try {
    const res = await cloudinary.uploader.upload(baseImageUrl);

    return res.secure_url;

  } catch (error: unknown) {

    if (error instanceof Error) {
      throw new Error("Cloudinary Error: " + error.message);
    }

    throw new Error("Unknown Cloudinary Error");
  }
};