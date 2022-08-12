module.exports = (sequelize, DataTypes) => {
    const COMPANY_ID = {
        MASTER: 'a8ebbc30-85db-448a-85a3-92fbe6a5dbdb',
    };

    const STATUS = {
        ACTIVE: 'ACTIVE',
        INACTIVE: 'INACTIVE',
        PENDING: 'PENDING',
        SUSPENDED: 'SUSPENDED',
        DRAFT: 'DRAFT',
        BLOCKED: 'BLOCKED',
    };

    const Company = sequelize.define(
        'Company',
        {
            companyId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'company_id',
            },
            companyName: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'company_name',
                validate: { len: [0, 255] },
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'email',
                validate: { isEmail: true },
            },
            address: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'address',
                validate: { len: [0, 255] },
            },
            city: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'city',
                validate: { len: [0, 255] },
            },
            province: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'province',
                validate: { len: [0, 255] },
            },
            postalCode: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'postal_code',
                validate: { len: [0, 255] },
            },
            country: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'country',
                validate: { len: [0, 255] },
            },
            phone: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'phone',
                validate: { len: [0, 255] },
            },
            status: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'status',
                defaultValue: STATUS.DRAFT,
                validate: { isIn: [Object.values(STATUS)] },
            },
            primaryColor: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'primary_color',
                validate: { len: [0, 255] },
            },
            textColor: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'text_color',
                validate: { len: [0, 255] },
            },
            subdomainId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'subdomain_id',
            },
            createdBy: {
                type: DataTypes.UUID,
                allowNull: true,
                field: 'created_by',
            },
            updatedBy: {
                type: DataTypes.UUID,
                allowNull: true,
                field: 'updated_by',
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'created_at',
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'updated_at',
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'deleted_at',
            },
        },
        {
            tableName: 'companies',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    Company.attributes = {
        base: [
            'companyId',
            'companyName',
            'subdomainId',
            'address',
            'city',
            'province',
            'postalCode',
            'country',
            'phone',
            'email',
            'status',
            'primaryColor',
            'textColor',
            'createdAt',
            'updatedAt',
        ],
        status: ['companyId', 'status'],
    };

    Company.include = {
        base: (include = []) => {
            return {
                model: Company,
                as: 'companies',
                required: false,
                attributes: Company.attributes.base,
                include,
            };
        },
    };

    Company.associate = ({ User, LastUser, Subdomain, CompanyImage }) => {
        Company.hasOne(User, {
            foreignKey: 'companyId',
            sourceKey: 'companyId',
            as: 'users',
            scope: { role: 'ADMIN' },
        });
        Company.hasOne(LastUser, {
            foreignKey: 'companyId',
            sourceKey: 'companyId',
            as: 'lastUser',
        });

        Company.hasMany(User, {
            foreignKey: 'companyId',
            sourceKey: 'companyId',
            as: 'usersArray',
        });

        Company.hasOne(Subdomain, {
            foreignKey: 'subdomainId',
            sourceKey: 'subdomainId',
            as: 'subdomain',
        });

        Company.hasMany(CompanyImage, {
            foreignKey: 'companyId',
            sourceKey: 'companyId',
            as: 'images',
        });
    };

    Company.STATUS = STATUS;
    Company.STATUSES = Object.values(STATUS);

    Company.COMPANY_ID = COMPANY_ID;

    return Company;
};
