const { logger } = require('../base/logger');

const sleep = (delay = 1000) => new Promise((resolve) => setTimeout(resolve, delay));

const dbAuthenticate = async (sequelize) => {
    try {
        await sequelize.authenticate();
        logger.info('Connection with database has been established successfully.');
    } catch (err) {
        logger.error('Unable to connect to the database');
        process.exit(-1);
    }
};

module.exports = {
    sleep,
    dbAuthenticate,
};
