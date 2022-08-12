const httpStatusCodes = require('http-status-codes');
const companyService = require('../../../services/company');
const subdomainService = require('../../../services/subdomain');
const userService = require('../../../services/user');
const awsService = require('../../../services/aws');
const stripeService = require('../../../services/stripe');
const { Company, User } = require('../../../../models');
const { ConflictError } = require('../../../errors');
const {
    buildChangeBatchByName,
    buildChangeBatches,
    buildDomainName,
    ACTION_DELETE,
} = require('../../../../src/helpers/route53');

const domainName = process.env.AWS_ROUTE53_DOMAIN_NAME;

/**
 * Create company
 * */
const createCompany = async (req, res) => {
    const {
        companyName,
        subdomainName,
        address,
        city,
        province,
        postalCode,
        country,
        phone,
        email,
        adminEmail,
    } = req.body;

    // CREATE SUBDOMAIN
    const { subdomainId } = await subdomainService.createSubdomain({ name: subdomainName });

    // CREATE COMPANY
    const company = await companyService.createCompany({
        companyName,
        subdomainId,
        address,
        city,
        province,
        postalCode,
        country,
        phone,
        email,
    });

    /** CREATE USER ADMIN FOR CURRENT COMPANY */
    const { userId } = await userService.createUser({
        phone,
        subdomainId,
        email: adminEmail,
        role: User.ROLE.ADMIN,
        companyId: company.companyId,
    });

    /** CREATE STRIPE CUSTOMER */
    await stripeService.customer.create({
        userId,
        phone,
        subdomainId,
        email: adminEmail,
        companyId: company.companyId,
    });

    /** CREATE SUBDOMAIN RECORD */
    const fullDomainName = `${subdomainName}.${domainName}`;
    await awsService.route53.changeResourceRecordSets(buildChangeBatchByName(fullDomainName));
    res.json({ data: { company } });
};

/**
 * Get company list
 * */
const readCompany = async (req, res) => {
    const { search, limit, offset } = req.query;
    const data = await companyService.findCompany.all.listPaginated({ search, limit, offset });
    res.json({ data });
};

/**
 * Get specific company by companyId
 * */
const findCompany = async (req, res) => {
    const { companyId } = req.state.company;
    const company = await companyService.findCompany.one.byCompanyId({ companyId });
    res.json({ data: { company } });
};

/**
 * Update company
 * */
const updateCompany = async (req, res) => {
    const { companyId } = req.params;
    const { userId } = req.state.user;
    const {
        companyName,
        address,
        city,
        province,
        postalCode,
        country,
        phone,
        email,
        adminEmail,
        status,
        primaryColor,
        textColor,
        subdomainName,
    } = req.body;

    await companyService.updateCompany.one.byCompanyId(
        { companyId },
        {
            companyName,
            address,
            city,
            province,
            postalCode,
            country,
            phone,
            email,
            status,
            primaryColor,
            textColor,
            updatedBy: userId,
        }
    );

    /** UPDATE SUBDOMAIN */
    /** Check subdomain */
    let company = await companyService.findCompany.one.byCompanyId({ companyId });
    const { name: currentSubdomainName, subdomainId } = company.subdomain;
    if (subdomainName && subdomainName !== currentSubdomainName) {
        const subdomainExist = await subdomainService.findSubdomain.one.bySubdomainName({
            name: subdomainName,
        });

        if (subdomainExist) {
            throw new ConflictError({ message: 'THIS SUBDOMAIN IS EXIST!!!' });
        }

        /** Update subdomain on AWS */
        await awsService.route53.changeResourceRecordSets(
            buildChangeBatches([
                { name: buildDomainName(currentSubdomainName), action: ACTION_DELETE },
                { name: buildDomainName(subdomainName) },
            ])
        );

        /** Update subdomain in DATABASE */
        await subdomainService.updateSubdomain.one.bySubdomainId(
            { subdomainId },
            { name: subdomainName }
        );

        // fetch company with updated subdomain
        company = await companyService.findCompany.one.byCompanyId({ companyId });
    }

    /** CHECK USERS EMAIL */
    const { email: currentAdminEmail } = company.users;
    if (adminEmail && adminEmail !== currentAdminEmail && company.status === Company.STATUS.DRAFT) {
        await userService.updateUser.one.byUserId(
            { userId: company.users.userId },
            { email: adminEmail }
        );

        // fetch company with updated user
        company = await companyService.findCompany.one.byCompanyId({ companyId });
    }

    res.json({ data: company });
};

/**
 * To remove company
 * */
const deleteCompany = async (req, res) => {
    const { companyId } = req.params;
    const { company } = req.state;
    const { status } = company;
    if (status !== Company.STATUS.DRAFT && status !== Company.STATUS.PENDING)
        throw new ConflictError({
            message: 'ONLY COMPANY WITH STATUS DRAFT AND PENDING CAN BE REMOVED !!!',
        });

    const currentCompany = await companyService.findCompany.one.byCompanyId({ companyId });
    const { subdomain, users: accountAdmin } = currentCompany;
    const { name: subdomainName } = subdomain;

    /** REMOVE SUBDOMAIN */
    /** FROM AWS */
    await awsService.route53.changeResourceRecordSets(
        buildChangeBatches([{ name: buildDomainName(subdomainName), action: ACTION_DELETE }])
    );
    /** FROM DB */
    if (subdomain && subdomain.subdomainId) {
        const { subdomainId } = subdomain;
        await subdomainService.removeSubdomain.one.bySubdomainId({ subdomainId });
    }

    /** REMOVE ACCOUNT ADMIN */
    if (accountAdmin && accountAdmin.userId) {
        const { userId } = accountAdmin;
        await userService.removeUser.one.byUserId({ userId });
    }

    /** REMOVE COMPANY */
    if (currentCompany && currentCompany.companyId) {
        await companyService.removeCompany.one.byCompanyId({ companyId });
    }

    res.sendStatus(httpStatusCodes.NO_CONTENT);
};

module.exports = {
    createCompany,
    readCompany,
    findCompany,
    updateCompany,
    deleteCompany,
};
