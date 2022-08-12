const { getInfoObject } = require('../../base/logger');
const awsService = require('../aws');

const sendEmail = async ({ to, subject, text, html, from }) => {
    try {
        const result = await awsService.sendEmail({ to, subject, text, html, from });
        return { result };
    } catch (err) {
        return { error: getInfoObject(err) };
    }
};

module.exports = sendEmail;
