/* eslint-disable no-await-in-loop */
require('../../config-env');

const { Op, literal } = require('sequelize');
const { createJob, manager } = require('../base/cron');
const { sleep } = require('../helpers/connections');
const companyService = require('../services/company');
const { LastUser, Company } = require('../../models');
const { logger } = require('../base/logger');

const { CRON_TIME_COMPANY_INACTIVE = '0 0 1 * * *' } = process.env;

const getLastUsers = () =>
    LastUser.findAll({
        where: { lastLogin: { [Op.lt]: literal(`NOW() - INTERVAL '2 month'`) } },
        include: [
            {
                model: Company,
                as: 'company',
                where: { status: Company.STATUS.ACTIVE },
            },
        ],
    });

const onTick = async () => {
    const users = await getLastUsers();
    if (users.length > 0) {
        const companyIds = users.map(({ companyId }) => companyId);
        await companyService.updateCompany.one.byCompanyId(
            { companyId: companyIds },
            { status: Company.STATUS.INACTIVE }
        );

        logger.info(`Processed company status ${Company.STATUS.INACTIVE}: ${companyIds}`);
        await sleep(300);
    }
};

module.exports = {
    onTick,
    cronId: 'processCompanyInactive',
    alias: 'process-company-inactive',
    job: createJob({ cronTime: CRON_TIME_COMPANY_INACTIVE, onTick: manager.manage(onTick) }),
};
