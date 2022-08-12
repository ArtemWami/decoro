const { s3: s3Config } = require('./config');
const { s3 } = require('./client');

const deleteObject = (key) => s3.deleteObject({ Key: key, Bucket: s3Config.bucket }).promise();

module.exports = {
    deleteObject,
};
