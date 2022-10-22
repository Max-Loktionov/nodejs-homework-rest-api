const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const cloudinary = require("cloudinary");

const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");
const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
  secure: true,
});
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const sizeImgPx = 250;
  if (!req.file)
    throw RequestError(
      400,
      "Request body has to contain field avatar and attached image, enctype=multipart/form-data"
    );

  try {
    const { path: tempUpload, filename } = req.file;

    const { _id, email } = req.user;
    const extention = filename.split(".").pop();
    const userName = email.split("@").shift();

    const avatarName = `${_id}_${userName}.${extention}`;
    const resultUpload = path.join(avatarsDir, avatarName);

    const jimpFile = await Jimp.read(tempUpload);
    await jimpFile.resize(sizeImgPx, sizeImgPx).writeAsync(tempUpload);

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", avatarName);

    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      email,
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw RequestError(400, "Error in attached image");
  }
};

module.exports = updateAvatar;
