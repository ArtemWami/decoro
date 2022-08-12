const { TransactionalEmailTemplate } = require('../../../models');
const { render } = require('../../helpers/templates');

const getTransactionalEmailTemplate = (type) => {
    if (type instanceof TransactionalEmailTemplate) {
        return type;
    }

    return TransactionalEmailTemplate.findOne({ where: { type } });
};

const renderByType = async (type, params = {}) => {
    const template = await getTransactionalEmailTemplate(type);
    const { subject, text, html } = template;
    return {
        template,
        subject: render(subject, params),
        text: render(text, params),
        html: render(html, params),
    };
};

module.exports = renderByType;
