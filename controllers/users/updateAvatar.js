const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { path: tempUpload, filename } = req.file;

    const { _id, email } = req.user;
    const [extention] = filename.split(".").reverse();
    const avatarName = `${_id}.${extention}`;
    const resultUpload = path.join(avatarsDir, avatarName);

    const jimpFile = await Jimp.read(tempUpload);
    jimpFile.resize(250, 250).write(`${resultUpload}`);

    const avatarURL = path.join("avatars", resultUpload);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      email,
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
