const { User, Company, EmailTemplate, Op } = require('../../../models');
const { omitUndefined } = require('../../helpers/model');

const findOneParentByEmailTemplateId = ({ emailTemplateId, companyId, subdomainId }, attributes) =>
    EmailTemplate.findOne({
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
        where: {
            [Op.or]: [
                { emailTemplateId, companyId: Company.COMPANY_ID.MASTER },
                { '$child.email_template_id$': emailTemplateId },
            ],
        },
    });

module.exports = findOneParentByEmailTemplateId;
