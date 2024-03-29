const path = require("path");
const sharp = require("sharp");

module.exports = async (req, _, next) => {
  if (req.file) {
    const { buffer, originalname } = req.file;
    const name = originalname.split(" ").join("-");
    const nameWithoutExtension = name
      .split(".")
      .slice(0, name.split(".").length - 1)
      .join(".");
    const fileToBeStoredName =
      nameWithoutExtension + "-" + Date.now() + ".webp";
    await sharp(buffer)
      .webp({ quality: 100 })
      .toFile(`${path.join(__dirname, "../images")}/${fileToBeStoredName}`);
    req.fileToBeStoredName = fileToBeStoredName;
  }
  next();
};
