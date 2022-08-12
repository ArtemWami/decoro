module.exports = (sequelize, DataTypes) => {
    const LastUser = sequelize.define(
        'LastUser',
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
            tableName: 'last_users_view',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    LastUser.attributes = {
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
    };

    LastUser.associate = ({ Company }) => {
        LastUser.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
    };

    return LastUser;
};
