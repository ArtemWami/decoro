const { sanitize } = require('../src/helpers/templates');

module.exports = (sequelize, DataTypes) => {
    const EMAIL_ID = {
        BEGINNING_OF_CAMPAIGN: '0dd0474f-cdb3-415a-8ffd-048a45e6bad1',
        T7_DAYS_AFTER_BEGINNING_OF_CAMPAIGN: 'c443d690-f2bc-422d-8138-f6bd20988fb0',
        T14_DAYS_AFTER_BEGINNING_OF_CAMPAIGN: '818da960-4e39-43f8-8192-4e6fb32157ef',
        T21_DAYS_AFTER_BEGINNING_OF_CAMPAIGN: '7ab75263-953a-410e-9be5-c3737042fa0d',
        THANK_YOU_FOR_SELECTION: '7e98ff67-1f68-4b27-90f8-b9e2f628a843',
        END_OF_CAMPAIGN: '21c04e3e-e3e1-49fe-b506-bf4dd40335fc',
    };

    const STAGE = {
        BEGINNING_OF_CAMPAIGN: 'Beginning of campaign',
        DAYS_AFTER_BEGINNING_OF_CAMPAIGN: 'days after beginning of campaign',
        THANK_YOU_FOR_SELECTION: 'Thank you for your selection',
        END_OF_CAMPAIGN: 'End of campaign email',
    };

    const EmailTemplate = sequelize.define(
        'EmailTemplate',
        {
            emailTemplateId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'email_template_id',
            },
            subject: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'subject',
                validate: { len: [0, 255] },
            },
            deliveryStage: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'delivery_stage',
                validate: { isIn: [Object.values(STAGE)] },
            },
            daysDelay: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'days_delay',
            },
            template: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'template',
                validate: { len: [0, 10000] },
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'name',
                validate: { len: [0, 255] },
            },
            from: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'from',
                validate: { len: [0, 255] },
            },
            isEnabled: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                field: 'is_enabled',
            },
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                field: 'order_id',
            },
            parentEmailTemplateId: {
                type: DataTypes.UUID,
                allowNull: true,
                field: 'parent_email_template_id',
                validate: { isIn: [Object.values(EMAIL_ID)] },
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
            text: {
                type: DataTypes.VIRTUAL,
                get() {
                    let text = this.getDataValue('template');
                    if (!text) {
                        return '';
                    }

                    text = text.replaceAll('<br>', '\n');
                    return sanitize(text);
                },
            },
        },
        {
            tableName: 'email_templates',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
            defaultScope: {
                attributes: {
                    exclude: ['deletedAt', 'text'],
                },
            },
        }
    );

    EmailTemplate.attributes = {
        base: [
            'emailTemplateId',
            'parentEmailTemplateId',
            'template',
            'name',
            'subject',
            'deliveryStage',
            'daysDelay',
            'isEnabled',
            'companyId',
        ],
    };

    EmailTemplate.EMAIL_ID = EMAIL_ID;
    EmailTemplate.EMAIL_IDS = Object.values(EMAIL_ID);

    EmailTemplate.STAGE = STAGE;

    EmailTemplate.include = {};

    EmailTemplate.associate = ({ User }) => {
        EmailTemplate.belongsTo(User, {
            foreignKey: 'updatedBy',
            targetKey: 'userId',
            as: 'updatedByUser',
        });

        EmailTemplate.hasOne(EmailTemplate, {
            sourceKey: 'emailTemplateId',
            foreignKey: 'parentEmailTemplateId',
            as: 'child',
        });
    };

    return EmailTemplate;
};
