module.exports = (sequelize, DataTypes) => {
    const EMAIL_TYPE = {
        CHANGE_EMAIL_CANCEL_STEP_1: 'CHANGE_EMAIL_CANCEL_STEP_1',
        CHANGE_EMAIL_CONFIRMATION_STEP_1: 'CHANGE_EMAIL_CONFIRMATION_STEP_1',
        CHANGE_EMAIL_CANCEL_STEP_2: 'CHANGE_EMAIL_CANCEL_STEP_2',
        CHANGE_EMAIL_CONFIRMATION_STEP_2: 'CHANGE_EMAIL_CONFIRMATION_STEP_2',
        ADMIN_INVITATION: 'ADMIN_INVITATION',
        TEAM_MEMBER_INVITATION: 'TEAM_MEMBER_INVITATION',
        FORGOT_PASSWORD: 'FORGOT_PASSWORD',
    };

    const TransactionalEmailTemplate = sequelize.define(
        'TransactionalEmailTemplate',
        {
            transactionalEmailTemplateId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'transactional_email_template_id',
            },
            type: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'type',
                unique: true,
                validate: { isIn: [Object.values(EMAIL_TYPE)] },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'description',
                validate: { len: [0, 1000] },
            },
            subject: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'subject',
                validate: { len: [0, 255] },
            },
            text: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'text',
                validate: { len: [0, 10000] },
            },
            html: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'html',
                validate: { len: [0, 10000] },
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
            tableName: 'transactional_email_templates',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    TransactionalEmailTemplate.attributes = {
        base: ['transactionalEmailTemplateId', 'type', 'subject', 'text', 'html'],
    };

    TransactionalEmailTemplate.TYPE = EMAIL_TYPE;
    TransactionalEmailTemplate.TYPES = Object.values(EMAIL_TYPE);

    TransactionalEmailTemplate.include = {};

    TransactionalEmailTemplate.associate = ({}) => {};

    return TransactionalEmailTemplate;
};
