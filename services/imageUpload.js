const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), 'images'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const imageUpload = multer({ storage }).single('image');

module.exports = imageUpload;
