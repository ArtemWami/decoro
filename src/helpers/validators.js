const validateImage =
    ({ maxSize } = { maxSize: 15 * 1024 * 1024 }) =>
    (value, { req }) => {
        if (!req.file) {
            return;
        }

        const { mimetype, size } = req.file;
        return mimetype.startsWith('image/') && size < maxSize;
    };

module.exports = {
    validateImage,
};
