require('../../../config-env');

const { CACHE_STD_TTL } = process.env;

module.exports = {
    stdTTL: Number(CACHE_STD_TTL),
};
