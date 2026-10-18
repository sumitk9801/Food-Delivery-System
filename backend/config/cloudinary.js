import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY || process.env.API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET || process.env.API_SECRET || process.env.API_ENVIRONMENT_VARIABLE
};

if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
    throw new Error("Cloudinary configuration is missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.");
}

cloudinary.config(cloudinaryConfig);

export const uploadFoodImage = (buffer) => new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream({
        folder: "food-delivery/foods",
        resource_type: "image",
        transformation: [
            { width: 1200, height: 1200, crop: "limit", quality: "auto", fetch_format: "auto" }
        ]
    }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
    });

    upload.end(buffer);
});

export const deleteFoodImage = (publicId) => cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
    invalidate: true
});