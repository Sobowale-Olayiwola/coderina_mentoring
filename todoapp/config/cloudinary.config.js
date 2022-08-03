const cloudinary = require("cloudinary");
const { resolve } = require("path");

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      { resourse_type: "auto", folder: folder },
      (error, result) => {
        resolve({ url: result.url, id: result._id });
      }
    );
  });
};

module.exports = { uploads };
