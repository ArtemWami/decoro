const tableName = 'transactional_email_logs';

const up = async (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
        transactionalEmailLogId: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            field: 'transactional_email_log_id',
        },
        transactionalEmailTemplateId: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            field: 'transactional_email_template_id',
        },
        email: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'email',
        },
        result: {
            type: Sequelize.DataTypes.JSONB,
            allowNull: true,
            field: 'result',
        },
        error: {
            type: Sequelize.DataTypes.JSONB,
            allowNull: true,
            field: 'error',
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
