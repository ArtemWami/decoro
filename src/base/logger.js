const logger = console;
const getInfoObject = ({ message, stack, code }) => ({ message, stack, code });

module.exports = {
    logger,
    getInfoObject,
};
