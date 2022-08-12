const { wrap } = require('../../../base/middleware');
const companiesProvider = require('../../../providers/companies');
const subdomainsProvider = require('../../../providers/subdomains');
const { extractSubdomainName } = require('../../../helpers/requests');
const { updateRequestState } = require('../../../helpers/middleware');
const { BadRequestError, NotFoundError } = require('../../../errors');
const { Company } = require('../../../../models');

const checkCompanyStatus = (company) => {
    if (!company || company.status === Company.STATUS.BLOCKED) {
        throw new NotFoundError({ message: 'COMPANY NOT FOUND' });
    }

    if (company.status === Company.STATUS.SUSPENDED) {
        throw new BadRequestError({ message: 'COMPANY SUSPENDED' });
    }
};

const checkSubdomainPermission = () =>
    wrap(async (req) => {
        const subdomainName = extractSubdomainName(req.get('origin'));
        if (!subdomainName) {
            throw new BadRequestError({ message: 'Invalid subdomain' });
        }

        const subdomain = await subdomainsProvider.findOneByName(subdomainName);
        if (!subdomain) {
            throw new NotFoundError({ message: 'Subdomain not found' });
        }

        const company = await companiesProvider.findOneBySubdomainId(subdomain.subdomainId);
        checkCompanyStatus(company);
        updateRequestState(req, { subdomain, company });
    });

module.exports = {
    checkSubdomainPermission,
};
