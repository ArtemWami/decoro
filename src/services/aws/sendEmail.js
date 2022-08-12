const { toArray } = require('../../helpers/arrays');

const config = require('./config');
const { ses } = require('./client');

const getParams = ({ to, from, reply, html, text, subject }) => ({
    Source: from,
    ReplyToAddresses: toArray(reply),
    Destination: { CcAddresses: [], ToAddresses: toArray(to) },
    Message: {
        Subject: { Charset: 'UTF-8', Data: subject },
        Body: { Html: { Charset: 'UTF-8', Data: html }, Text: { Charset: 'UTF-8', Data: text } },
    },
});

const sendEmail = async ({
    to,
    subject,
    html,
    text,
    from = config.emails.from,
    reply = config.emails.reply,
}) => {
    if (!config.ses.enabled) {
        return null;
    }

    const params = getParams({ to, subject, html, text, from, reply: reply || from });
    return ses.sendEmail(params).promise();
};

module.exports = sendEmail;
