const multer = require("multer");
const path = require("path");

const { RequestError } = require("../helpers");
const tempDir = path.join(__dirname, "../", "temp");

const maxAvatarSize = 9000000; //  Max field value size (in bytes)

const multerconfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/bmp"
  ) {
    cb(null, true);
    return;
  }

  cb(null, false);

  cb(RequestError(400, "File format should be jpeg, png, jpg, bmp"));
}
const upload = multer({
  storage: multerconfig,
  limits: { fileSize: maxAvatarSize },
  fileFilter,
});

module.exports = upload;
