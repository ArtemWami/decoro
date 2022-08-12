const {
    Company,
    User,
    LastUser,
    Subdomain,
    CompanyImage,
    Op,
    sequelize,
} = require('../../../models');

const includeLastUser = {
    model: LastUser,
    as: 'lastUser',
    required: false,
    attributes: LastUser.attributes.base,
};

const includeAdmins = {
    model: User,
    as: 'users',
    required: false,
    attributes: User.attributes.base,
    where: {
        [Op.and]: [
            {
                role: {
                    [Op.in]: [User.ROLE.ADMIN_MANAGER, User.ROLE.TEAM_MEMBER, User.ROLE.ADMIN],
                },
            },
        ],
    },
    order: [['last_login', 'ASC']],
};

const includeCompanyImage = {
    model: CompanyImage,
    as: 'images',
    required: false,
    separate: true,
    order: [['createdAt', 'DESC']],
    attributes: CompanyImage.attributes.base,
};

const getCompanyId = ({ companyId }) => companyId;

const findCompany = {
    all: {
        listPaginated: async ({ search, limit, offset } = {}) => {
            const { rows, count } = await Company.findAndCountAll({
                limit,
                offset,
                where: { ...(search && { company_name: { [Op.iLike]: `%${search}%` } }) },
                attributes: ['companyId'],
                order: [['createdAt', 'DESC']],
            });

            if (count === 0) {
                return { count, rows: [] };
            }

            const companyIds = rows.map(getCompanyId);
            const data = await Company.findAll({
                include: [
                    includeAdmins,
                    includeLastUser,
                    Subdomain.include.base(),
                    CompanyImage.include.base(),
                ],
                attributes: Company.attributes.base,
                where: { companyId: companyIds },
                order: [
                    sequelize.fn(
                        'ARRAY_POSITION',
                        companyIds,
                        sequelize.cast(sequelize.col('"Company"."company_id"'), 'text')
                    ),
                ],
            });

            return { rows: data, count };
        },
        list: () =>
            Company.findAll({
                include: [includeAdmins, Subdomain.include.base(), CompanyImage.include.base()],
                attributes: Company.attributes.base,
                order: [['createdAt', 'DESC']],
            }),
    },
    one: {
        byCompanyId: ({
            companyId,
            attributes = Company.attributes.base,
            include = [User.include.base(), Subdomain.include.base(), CompanyImage.include.base()],
        }) => Company.findOne({ include, where: { companyId }, attributes }),
        bySubdomainId: ({ subdomainId, attributes = Company.attributes.base }) =>
            Company.findOne({ where: { subdomainId }, include: [includeCompanyImage], attributes }),
        countByEmail: ({ email, companyId }) =>
            Company.count({ where: { email, companyId: { [Op.ne]: companyId } } }),
    },
};

module.exports = {
    findCompany,
};
