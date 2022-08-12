const { EmailTemplateImage } = require('../../../models');

const create = ({
    emailTemplateId,
    type,
    key,
    location,
    size,
    companyId,
    subdomainId,
    createdBy,
}) =>
    EmailTemplateImage.create({
        emailTemplateId,
        type,
        key,
        location,
        size,
        companyId,
        subdomainId,
        createdBy,
    });

module.exports = create;
