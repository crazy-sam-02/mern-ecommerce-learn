import cloudinary from "cloudinary";
import multer from "multer";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const imageUploadUtil = async (dataUrl) => {
  return await cloudinary.uploader.upload(dataUrl, {
    folder: "products",
    resource_type: "image",
  });
};


const storage = new multer.memoryStorage();




export const upload = multer({ storage });
