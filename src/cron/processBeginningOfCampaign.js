/* eslint-disable no-await-in-loop */
require('../../config-env');

const { Op, literal } = require('sequelize');
const { createJob, manager } = require('../base/cron');
const { logger } = require('../base/logger');
const { sleep } = require('../helpers/connections');
const { buildLink, buildUrl } = require('../helpers/templates');
const { generateKey } = require('../services/aws/utils');
const emailsService = require('../services/emails');
const emailTemplatesService = require('../services/emailTemplates');
const userInvitationService = require('../services/userInvitation');
const { Company, Buildings, EmailTemplate, Units, User, Subdomain } = require('../../models');

const { CRON_TIME_BEGINNING_OF_CAMPAIGN = '0 0 8 * * *' } = process.env;
const { BEGINNING_OF_CAMPAIGN } = EmailTemplate.EMAIL_ID;

const findOneBuildingWithCampaign = () =>
    Buildings.findOne({
        subQuery: false,
        attributes: ['buildingId', 'companyId', 'subdomainId', 'name'],
        where: {
            campaignEndedAt: { [Op.eq]: null },
            campaignStartedAt: {
                [Op.between]: [literal(`NOW() - INTERVAL '1 day'`), literal('NOW()')],
            },
            '$units->emailTemplates.email_template_id$': { [Op.eq]: null },
        },
        order: [['campaignStartedAt', 'ASC']],
        include: [
            {
                model: Subdomain,
                as: 'subdomain',
            },
            {
                model: Units,
                as: 'units',
                attributes: ['unitId'],
                include: [
                    {
                        model: User,
                        as: 'recipient',
                        required: true,
                        attributes: [
                            'email',
                            'userId',
                            'firstName',
                            'lastName',
                            'companyId',
                            'subdomainId',
                        ],
                    },
                    {
                        model: EmailTemplate,
                        as: 'emailTemplates',
                        required: false,
                        attributes: ['emailTemplateId'],
                        through: { attributes: [] },
                        where: {
                            [Op.or]: [
                                {
                                    emailTemplateId: BEGINNING_OF_CAMPAIGN,
                                    companyId: Company.COMPANY_ID.MASTER,
                                },
                                { parentEmailTemplateId: BEGINNING_OF_CAMPAIGN },
                            ],
                        },
                    },
                ],
            },
        ],
    });

const createUserInvitation = async ({ userId, email, companyId, subdomainId }) => {
    const invitation = await userInvitationService.findUserInvitation.one.byUserId({ userId });
    if (invitation && invitation.verify === true) {
        return null;
    }

    if (invitation && invitation.verify === false) {
        await userInvitationService.removeUserInvitation.one.byUserId({ userId });
    }

    return userInvitationService.createUserInvitation({
        userId,
        email,
        companyId,
        subdomainId,
        key: generateKey(),
    });
};

const onTick = async () => {
    let prevBuilding = null;
    let building;
    while (
        (building = await findOneBuildingWithCampaign()) &&
        (!prevBuilding || building.buildingId !== prevBuilding.buildingId) // prevent cycling single loop
    ) {
        const parentEmailTemplate = await emailTemplatesService.findOneParentByEmailTemplateId({
            emailTemplateId: BEGINNING_OF_CAMPAIGN,
            companyId: building.companyId,
        });

        let emailTemplate = parentEmailTemplate;
        if (parentEmailTemplate.child) {
            emailTemplate = parentEmailTemplate.child;
        }

        const { buildingId, companyId, subdomainId, subdomain } = building;
        for (let i = 0; i < building.units.length; i += 1) {
            const unit = building.units[i];
            const { recipient } = unit;
            const invitation = await createUserInvitation(recipient);
            const url = invitation
                ? buildUrl(subdomain, `/registration/${invitation.key}`)
                : buildUrl(subdomain, '/login');

            await emailsService.sendCampaignEmail(
                {
                    buildingId,
                    companyId,
                    subdomainId,
                    unitId: unit.unitId,
                    from: subdomain.name,
                    to: recipient.email,
                    userId: recipient.userId,
                    emailTemplateId: emailTemplate,
                },
                {
                    'First name': recipient.firstName,
                    'Last name': recipient.lastName,
                    'Building name': building.name,
                    'Invitation link': buildLink(url),
                }
            );

            logger.info(
                `Processed campaign email ${BEGINNING_OF_CAMPAIGN} for unitId: ${unit.unitId}`
            );

            await sleep(300);
        }

        logger.info(`Processed beginning of campaign for buildingId: ${building.buildingId}`);
        prevBuilding = building;
    }
};

module.exports = {
    onTick,
    cronId: 'processBeginningOfCampaign',
    alias: 'process-beginning-of-campaign',
    job: createJob({ cronTime: CRON_TIME_BEGINNING_OF_CAMPAIGN, onTick: manager.manage(onTick) }),
};
