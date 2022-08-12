module.exports = (sequelize, DataTypes) => {
    const TransactionalEmailLog = sequelize.define(
        'TransactionalEmailLog',
        {
            transactionalEmailLogId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'transactional_email_log_id',
            },
            transactionalEmailTemplateId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'transactional_email_template_id',
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'email',
                validate: { isEmail: true },
            },
            result: {
                type: DataTypes.JSONB,
                allowNull: true,
                field: 'result',
                validate: { len: [0, 1000] },
            },
            error: {
                type: DataTypes.JSONB,
                allowNull: true,
                field: 'error',
                validate: { len: [0, 1000] },
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
            tableName: 'transactional_email_logs',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    TransactionalEmailLog.attributes = {
        base: ['transactionalEmailLogId', 'transactionalEmailTemplateId', 'email', 'result'],
    };

    TransactionalEmailLog.include = {};

    TransactionalEmailLog.associate = ({}) => {};

    return TransactionalEmailLog;
};
