const multer = require('multer');
const { imageFileFilter } = require('../utils');
const createStorage = require('./createStorage');

const storage = createStorage('model');
const upload = multer({ storage, fileFilter: imageFileFilter });

module.exports = {
    storage,
    upload,
};
