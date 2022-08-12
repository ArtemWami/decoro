module.exports = (sequelize, DataTypes) => {
    const EmailTemplateLog = sequelize.define(
        'EmailTemplateLog',
        {
            emailTemplateLogId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'email_template_log_id',
            },
            emailTemplateId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'email_template_id',
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'email',
                validate: { isEmail: true },
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: true,
                field: 'user_id',
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
            from: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'from',
                validate: { isEmail: true },
            },
            unitId: {
                type: DataTypes.UUID,
                allowNull: true,
                field: 'unit_id',
            },
            buildingId: {
                type: DataTypes.UUID,
                allowNull: true,
                field: 'building_id',
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
            tableName: 'email_template_logs',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    EmailTemplateLog.attributes = {
        base: ['emailTemplateLogId', 'emailTemplateId', 'email', 'userId', 'companyId'],
    };

    EmailTemplateLog.include = {};

    EmailTemplateLog.associate = ({}) => {};

    return EmailTemplateLog;
};
