const { Company, User, EmailTemplate } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findAllParentsByCompanyId = (
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
        'createdAt',
        'updatedAt'
    ]
) =>
    EmailTemplate.findAll({
        attributes,
        include: [
            {
                attributes,
                model: EmailTemplate,
                as: 'child',
                required: false,
                where: { companyId, ...omitUndefined({ subdomainId }) },
                include: [
                    {
                        model: User,
                        as: 'updatedByUser',
                        attributes: ['userId', 'firstName', 'lastName', 'fullName'],
                    },
                ],
            },
        ],
        where: { companyId: Company.COMPANY_ID.MASTER },
        order: [['orderId', 'ASC']],
    });

module.exports = findAllParentsByCompanyId;
