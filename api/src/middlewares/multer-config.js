const multer = require("multer");
const path = require("path");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storageEngine = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, path.join(__dirname, "../images"));
  },
  filename: (_, file, callback) => {
    const name = file.originalname.split(" ").join("-");
    const nameWithoutExtension = name
      .split(".")
      .slice(0, name.split(".").length - 1)
      .join(".");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, nameWithoutExtension + "-" + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storageEngine }).single("image");
