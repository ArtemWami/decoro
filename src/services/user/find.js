const {
    User,
    Company,
    CompanyImage,
    Units,
    Op,
    Subdomain,
    StripeCustomer,
} = require('../../../models');

const { omitUndefined } = require('../../helpers/model');

const TWO_MONTH = 2 * 30 * 24 * 60 * 60 * 1000;

const includeUnits = (unitId) => {
    const includeUnitObj = {
        model: Units,
        through: { attributes: [] },
        attributes: Units.attributes.base,
        as: 'units',
    };
    if (unitId) includeUnitObj.where = { unitId };
    return includeUnitObj;
};

const includeCompany = (companyId) => {
    const includeCompanyObj = {
        model: Company,
        as: 'companies',
        required: true,
        attributes: Company.attributes.base,
    };
    if (companyId) includeCompanyObj.where = { companyId };
    return includeCompanyObj;
};

const includeCompanyImage = {
    model: CompanyImage,
    as: 'images',
    required: false,
    separate: true,
    order: [['createdAt', 'DESC']],
    attributes: CompanyImage.attributes.base,
};

// cached in provider
const findOneByUserId = ({ userId, attributes = User.attributes.base }) =>
    User.findOne({ where: { userId }, attributes });

const findUser = {
    findOneByUserId,
    all: {
        list: () => User.findAll(),
        byRole: ({ role, attributes = User.attributes.base, limit, offset }) =>
            User.findAll({
                limit,
                offset,
                where: { role },
                include: [Company.include.base()],
                attributes,
            }),
        inCompany: ({ attributes = User.attributes.base, limit, offset, companyId }) =>
            User.findAll({
                limit,
                offset,
                where: {
                    role: {
                        [Op.in]: [User.ROLE.TEAM_MEMBER, User.ROLE.ADMIN, User.ROLE.ADMIN_MANAGER],
                    },
                },
                include: [includeCompany(companyId)],
                order: [['createdAt', 'ASC']],
                attributes,
            }),
        byRoleOnBuilding: ({ role, attributes = User.attributes.base, limit, offset, unitId }) =>
            User.findAll({
                limit,
                offset,
                where: { role },
                include: [includeUnits(unitId)],
                attributes,
            }),
        byCompanyId: ({ companyId }) => User.findAll({ where: { companyId } }),
        afterLastLogin: () =>
            User.findAll({
                where: {
                    lastLogin: { [Op.lte]: new Date(new Date() - TWO_MONTH) },
                    role: User.ROLE.ADMIN,
                },
                include: [
                    {
                        model: Company,
                        as: 'companies',
                        required: true,
                        where: { status: Company.STATUS.ACTIVE },
                        attributes: Company.attributes.status,
                    },
                ],
            }),
        byEmailArray: {
            teamMembers: (emails = []) =>
                User.findAll({
                    where: {
                        email: { [Op.in]: emails },
                        role: User.ROLE.TEAM_MEMBER,
                    },
                }),
        },
        byEmailIncludeCompany: ({ email, attributes = User.attributes.base }) =>
            User.findAll({
                where: { email, emailVerified: true },
                include: [Company.include.base([Subdomain.include.base()])],
                attributes,
            }),
    },
    one: {
        byUserIdIdentify: ({ userId, attributes = User.attributes.base }) =>
            User.findOne({ where: { userId }, attributes }),
        byUserId: ({ userId, attributes = User.attributes.base }) =>
            User.findOne({
                where: { userId },
                include: [
                    Company.include.base([Subdomain.include.base(), includeCompanyImage]),
                    includeUnits(),
                    StripeCustomer.include.base(),
                ],
                attributes,
            }),
        byUserIdWithStripe: ({ userId, attributes = User.attributes.base }) =>
            User.findOne({
                where: { userId },
                include: [StripeCustomer.include.base()],
                attributes,
            }),
        byEmail: ({ email, companyId, attributes = User.attributes.base }) =>
            User.findOne({ where: { email, ...omitUndefined({ companyId }) }, attributes }),
        byEmailIncludeCompany: ({ email, attributes = User.attributes.base }) =>
            User.findOne({
                where: { email },
                include: [Company.include.base([Subdomain.include.base()])],
                attributes,
            }),
        byCompanyIdAdmin: ({ companyId }) =>
            User.findOne({ where: { companyId, role: User.ROLE.ADMIN } }),
    },
};

/** ACCOUNT ADMIN BLOCK */
const findIdentifyAdmin = ({ userId, attributes = User.attributes.base }) =>
    User.findOne({
        where: { userId },
        include: [
            Company.include.base([Subdomain.include.base(), includeCompanyImage]),
            StripeCustomer.include.base(),
        ],
        attributes,
    });

const findIdentity = ({ userId, attributes = User.attributes.base }) =>
    User.findOne({
        attributes,
        where: { userId },
        include: [Company.include.base([Subdomain.include.base(), includeCompanyImage])],
    });

/** OWNER BLOCK */
const findOwner = ({ userId }) =>
    User.findOne({
        where: { userId, role: User.ROLE.OWNER },
        attributes: ['firstName', 'lastName', 'email', 'phone'],
    });

const findOwnerByEmail = ({ email, companyId }) =>
    User.findOne({
        where: { email, companyId, role: User.ROLE.OWNER },
        attributes: ['firstName', 'lastName', 'email', 'phone', 'userId'],
    });

module.exports = {
    findUser,
    findIdentity,
    findOwner,
    findOwnerByEmail,
    findIdentifyAdmin,
};
