const { v2: cloudinary } = require("cloudinary");
const fs = require("fs/promises");
const { env } = require("../config/env");

cloudinary.config({
  cloud_name: env.cloudinaryCloudName,
  api_key: env.cloudinaryApiKey,
  api_secret: env.cloudinaryApiSecret,
  secure: true,
});

async function removeTempFile(file) {
  if (!file?.path) {
    return;
  }

  try {
    await fs.unlink(file.path);
  } catch {
    // Best-effort cleanup for temp uploads.
  }
}

async function uploadFile(file, resourceType, folder) {
  const result = await cloudinary.uploader.upload(file.path, {
    folder,
    resource_type: resourceType,
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

async function uploadImageAsset(imageFile, folder) {
  if (imageFile && (!env.cloudinaryCloudName || !env.cloudinaryApiKey || !env.cloudinaryApiSecret)) {
    const error = new Error("Cloudinary credentials are not configured.");
    error.statusCode = 503;
    throw error;
  }

  try {
    return imageFile ? await uploadFile(imageFile, "image", folder) : null;
  } finally {
    await removeTempFile(imageFile);
  }
}

async function uploadProjectMedia({ imageFile, videoFile }) {
  if ((imageFile || videoFile) && (!env.cloudinaryCloudName || !env.cloudinaryApiKey || !env.cloudinaryApiSecret)) {
    const error = new Error("Cloudinary credentials are not configured.");
    error.statusCode = 503;
    throw error;
  }

  try {
    const [image, video] = await Promise.all([
      imageFile ? uploadFile(imageFile, "image", "jay-yogeshwar-solar/projects/images") : Promise.resolve(null),
      videoFile ? uploadFile(videoFile, "video", "jay-yogeshwar-solar/projects/videos") : Promise.resolve(null),
    ]);

    return {
      images: image ? [image] : [],
      videos: video ? [video] : [],
    };
  } finally {
    await Promise.all([removeTempFile(imageFile), removeTempFile(videoFile)]);
  }
}

module.exports = { uploadProjectMedia, uploadImageAsset };
