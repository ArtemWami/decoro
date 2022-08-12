const multerS3 = require('multer-s3');
const { s3 } = require('../client');
const { s3: s3Config } = require('../config');
const { generateImageKey } = require('../utils');

const createStorage = (folder, bucket = s3Config.bucket) => {
    return multerS3({
        s3,
        bucket,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key(req, file, cb) {
            const path = `${folder}/${generateImageKey(file)}`;
            cb(null, path);
        },
    });
};

module.exports = createStorage;
