module.exports = (sequelize, DataTypes) => {
    const ChangeEmailHandler = sequelize.define(
        'ChangeEmailHandler',
        {
            changeEmailHandlerId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'change_email_handler_id',
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'user_id',
            },
            oldEmail: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'old_email',
                validate: { len: [0, 255] },
            },
            newEmail: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'new_email',
                validate: { len: [0, 255] },
            },
            isUpdated: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                field: 'is_updated',
            },
            confirmationKey: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'confirmation_key',
                validate: { len: [0, 255] },
            },
            cancelKey: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'cancel_key',
                validate: { len: [0, 255] },
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
            tableName: 'change_email_handlers',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    ChangeEmailHandler.attributes = {
        base: ['changeEmailHandlerId', 'userId', 'companyId', 'isUpdated', 'oldEmail', 'newEmail'],
    };

    ChangeEmailHandler.include = {
        base: (include = []) => {
            return {
                model: ChangeEmailHandler,
                as: 'ChangeEmailHandler',
                required: false,
                attributes: ChangeEmailHandler.attributes.base,
                include,
            };
        },
    };

    ChangeEmailHandler.associate = ({ User }) => {
        ChangeEmailHandler.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    };

    return ChangeEmailHandler;
};
