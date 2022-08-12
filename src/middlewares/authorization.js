const { UnauthorizedError } = require('../errors');
const { Company } = require('../../models');
const authService = require('../services/auth');
const usersProvider = require('../providers/users');
const companiesProvider = require('../providers/companies');
const subdomainsProvider = require('../providers/subdomains');
const { updateRequestState, isID } = require('../helpers/middleware');

const { AWS_ROUTE53_DOMAIN_NAME } = process.env;

const checkCompanyStatus = (company) => {
    if (!company) {
        throw new UnauthorizedError({ message: 'COMPANY NOT FOUND' });
    }

    if (company.status === Company.STATUS.SUSPENDED) {
        throw new UnauthorizedError({ message: 'COMPANY SUSPENDED' });
    }

    if (company.status === Company.STATUS.BLOCKED) {
        throw new UnauthorizedError({ message: 'Unauthorized' });
    }
};

const checkRequestOrigin = (req, subdomain) => {
    const originHost = req.get('origin');
    if (
        originHost &&
        originHost !== `https://${subdomain.name}.${AWS_ROUTE53_DOMAIN_NAME}` &&
        originHost !== `http://${subdomain.name}.decoro.localhost:3000` &&
        originHost !== 'https://api.qa.decoro.io'
    ) {
        throw new UnauthorizedError({ message: 'USER HAVE NOT CORRECT SUBDOMAIN !!!' });
    }
};

const decode = (token) => {
    try {
        return authService.verify(token);
    } catch (err) {
        throw new UnauthorizedError({ message: err.message });
    }
};

const checkAuthorization = async (req, res, next) => {
    const token = req.headers.accesstoken;
    if (!token) {
        throw new UnauthorizedError({ message: 'TOKEN IS NOT FOUND' });
    }

    const data = decode(token);
    const user = await usersProvider.findOneByUserId(data.userId);
    if (!user) {
        throw new UnauthorizedError({ message: 'USER NOT FOUND' });
    }

    const company = await companiesProvider.findOneByCompanyId(user.companyId);
    checkCompanyStatus(company);

    const subdomain = await subdomainsProvider.findOneBySubdomainId(company.subdomainId);
    if (!subdomain) {
        throw new UnauthorizedError({ message: 'SUBDOMAIN NOT FOUND' });
    }

    checkRequestOrigin(req, subdomain);
    updateRequestState(req, { user, company, subdomain });

    next();
};

module.exports = {
    checkRequestOrigin,
    checkAuthorization,
};
