// import package here
const multer = require("multer");

exports.uploadFile = (image) => {
  // define storage destination
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      //second params is the filename
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  // define function for file filtering
  const fileFilter = (req, file, cb) => {
    if (file.fieldname === image) {
      if (!file.originalname.match(/\.(jpg|JPG|JPEG|jpeg|png|PNG)$/)) {
        req.fileValidationError = {
          message: "Only image files are allowed!",
        };

        return cb(new Error("Only image files are allowed"), false);
      }
      cb(null, true);
    }
  };

  // maximum size for file upload
  const sizeInMB = 10;
  const maxSize = sizeInMB * 1024 * 1024;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    {
      name: image,
      maxCount: 4,
    },
  ]);

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }

      if (!req.files && !err) {
        return res.status(400).send({
          message: "Please select file to upload",
        });
      }

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file sized is 2MB",
          });
        }
        return res.status(400).send(err);
      }
      return next();
    });
  };
};
