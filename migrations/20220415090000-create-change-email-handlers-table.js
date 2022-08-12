const tableName = 'change_email_handlers';

const up = async (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
        changeEmailHandlerId: {
            type: Sequelize.DataTypes.UUID,
            efaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            field: 'change_email_handler_id',
        },
        userId: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            field: 'user_id',
        },
        oldEmail: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'old_email',
        },
        newEmail: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'new_email',
        },
        isCompanyEmail: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'is_company_email',
        },
        isUpdated: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'is_updated',
        },
        confirmationKey: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'confirmation_key',
        },
        cancelKey: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'cancel_key',
        },
        companyId: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            field: 'company_id',
        },
        subdomainId: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            field: 'subdomain_id',
        },
        createdBy: {
            type: Sequelize.DataTypes.UUID,
            allowNull: true,
            field: 'created_by',
        },
        updatedBy: {
            type: Sequelize.DataTypes.UUID,
            allowNull: true,
            field: 'updated_by',
        },
        createdAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            field: 'created_at',
        },
        updatedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            field: 'updated_at',
        },
        deletedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            field: 'deleted_at',
        },
    });
};

const down = async (queryInterface) => {
    return queryInterface.dropTable(tableName);
};

module.exports = {
    up,
    down,
};
