const { EmailTemplate } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findAllByCompanyId = (
    { companyId, subdomainId },
    attributes = [
        'emailTemplateId',
        'parentEmailTemplateId',
        'name',
        'subject',
        'deliveryStage',
        'daysDelay',
        'isEnabled',
        'companyId',
    ]
) =>
    EmailTemplate.findAll({
        attributes,
        where: { companyId, ...omitUndefined({ subdomainId }) },
        order: [['orderId', 'ASC']],
    });

module.exports = findAllByCompanyId;
