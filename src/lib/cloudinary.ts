import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const uploadOnCloudinary = async (
  buffer: Buffer
): Promise<string | null> => {

  try {
    return await new Promise((resolve, reject) => {

      cloudinary.uploader.upload_stream(
        { folder: "articles" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result?.secure_url || null);
        }
      ).end(buffer);

    });

  } catch (error) {
    console.log(error);
    return null;
  }
};