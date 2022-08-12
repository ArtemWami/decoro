const multer = require('multer');

const storage = multer.memoryStorage(); // Holds a buffer of the file in memory
const upload = multer({ storage });

module.exports = {
    storage,
    upload,
};
