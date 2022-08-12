module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            userId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'user_id',
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'email',
                validate: { len: [0, 255] },
            },
            emailVerified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                field: 'email_verified',
            },
            role: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'role',
                validate: { len: [0, 255] },
            },
            firstName: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'first_name',
                validate: { len: [0, 255] },
            },
            lastName: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'last_name',
                validate: { len: [0, 255] },
            },
            fullName: {
                type: DataTypes.VIRTUAL,
                get() {
                    const firstName = this.getDataValue('firstName');
                    const lastName = this.getDataValue('lastName');
                    return `${firstName} ${lastName}`;
                },
            },
            phone: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'phone',
                validate: { len: [0, 255] },
            },
            jobTitle: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'job_title',
                validate: { len: [0, 255] },
            },
            status: {
                type: DataTypes.TEXT,
                allowNull: false,
                defaultValue: 'PENDING',
                field: 'status',
                validate: { len: [0, 255] },
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'password',
                validate: { len: [0, 255] },
            },
            lastLogin: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'last_login',
            },
            languageCode: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'language_code',
                validate: { len: [0, 255] },
            },
            subdomainId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'subdomain_id',
            },
            companyId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'company_id',
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
            tableName: 'users',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    User.attributes = {
        base: [
            'userId',
            'firstName',
            'lastName',
            'email',
            'emailVerified',
            'role',
            'phone',
            'languageCode',
            'lastLogin',
            'subdomainId',
            'companyId',
            'jobTitle',
            'status',
            'createdAt',
        ],
        auth: ['userId', 'email', 'role', 'password'],
    };

    User.include = {
        base: (include = []) => {
            return {
                model: User,
                as: 'users',
                required: false,
                attributes: User.attributes.base,
                include,
            };
        },
    };

    User.associate = ({ Company, UserBuilding, Buildings, Units, UnitsUsers, StripeCustomer }) => {
        User.hasOne(Company, { foreignKey: 'companyId', sourceKey: 'companyId', as: 'companies' });
        User.belongsTo(Company, { foreignKey: 'companyId', as: 'usersArray' });
        User.hasOne(StripeCustomer, {
            foreignKey: 'userId',
            sourceKey: 'userId',
            as: 'stripeCustomer',
        });
        User.belongsToMany(Buildings, {
            through: UserBuilding,
            foreignKey: 'userId',
            as: 'building',
        });
        User.belongsToMany(Units, {
            through: UnitsUsers,
            foreignKey: 'userId',
            as: 'units',
        });
    };

    User.ROLE = {
        GUEST: 'GUEST',
        MASTER: 'MASTER',
        ADMIN: 'ADMIN',
        ADMIN_MANAGER: 'ADMIN_MANAGER',
        TEAM_MEMBER: 'TEAM_MEMBER',
        OWNER: 'OWNER',
    };

    User.STATUS = {
        ACTIVE: 'ACTIVE',
        PENDING: 'PENDING',
    };

    User.ROLE_BY_AUDIENCE = {
        master: [User.ROLE.MASTER],
        client: [User.ROLE.OWNER],
        admin: [User.ROLE.ADMIN, User.ROLE.ADMIN_MANAGER, User.ROLE.TEAM_MEMBER],
    };

    User.AUDIENCE = Object.keys(User.ROLE_BY_AUDIENCE);

    return User;
};
