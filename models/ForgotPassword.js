module.exports = (sequelize, DataTypes) => {
    const ForgotPassword = sequelize.define(
        'ForgotPassword',
        {
            forgotPasswordId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'forgot_password_id',
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'email',
                validate: { len: [0, 255] },
            },
            key: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'key',
                unique: true,
                validate: { len: [0, 255] },
            },
            reset: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                field: 'reset',
            },
            companyId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'company_id',
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
            tableName: 'forgot_passwords',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    ForgotPassword.attributes = {
        base: ['forgotPasswordId', 'email', 'key', 'reset', 'createdAt'],
    };

    ForgotPassword.include = {
        base: (include = []) => {
            return {
                model: ForgotPassword,
                as: 'ForgotPassword',
                required: false,
                attributes: ForgotPassword.attributes.base,
                include,
            };
        },
    };

    ForgotPassword.associate = ({ User }) => {
        ForgotPassword.belongsTo(User, { foreignKey: 'createdBy', as: 'createdByUser' });
    };

    return ForgotPassword;
};
