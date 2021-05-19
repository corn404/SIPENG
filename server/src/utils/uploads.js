const moment = require("moment");
const multer = require("multer");

const storagePengaduan = multer.diskStorage({
  destination: function (req, file, done) {
    console.log(__dirname);
    done(null, "src/public/uploads/pengaduan/");
  },

  filename: function (req, file, done) {
    done(null, `${moment().format("yyyyMMDD_HHmmss")}_${file.originalname}`);
  },
});

const storageProfile = multer.diskStorage({
  destination: function (req, file, done) {
    console.log(__dirname);
    done(null, "src/public/uploads/profile/");
  },

  filename: function (req, file, done) {
    done(null, `${moment().format("yyyyMMDD_HHmmss")}_${file.originalname}`);
  },
});

const filterFile = (req, file, done) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    done(null, true);
  } else {
    done(null, false);
  }
};

const uploadPengaduan = multer({
  //   dest: "src/public/uploads/",
  storage: storagePengaduan,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: filterFile,
});

const uploadProfile = multer({
  //   dest: "src/public/uploads/",
  storage: storageProfile,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: filterFile,
});

module.exports = {
  uploadPengaduan,
  uploadProfile,
};
