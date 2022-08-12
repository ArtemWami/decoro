const SEPARATOR = '.';

const buildKey = (...args) =>
    args
        .filter(Boolean)
        .join(SEPARATOR)
        .trim();

module.exports = buildKey;
