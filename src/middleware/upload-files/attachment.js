const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const Attachment = multer({ storage });

module.exports = Attachment;