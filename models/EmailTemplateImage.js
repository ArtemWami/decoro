module.exports = (sequelize, DataTypes) => {
    const IMAGE_TYPE = {
        EMAIL_TEMPLATE_IMG: 'EMAIL_TEMPLATE_IMG',
    };

    const EmailTemplateImage = sequelize.define(
        'EmailTemplateImage',
        {
            imageId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'image_id',
            },
            emailTemplateId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'email_template_id',
            },
            type: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'type',
                validate: { isIn: [Object.values(IMAGE_TYPE)] },
            },
            key: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'key',
                validate: { len: [0, 255] },
            },
            location: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'location',
                validate: { isUrl: true, len: [0, 255] },
            },
            size: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'size',
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
            tableName: 'email_template_images',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    EmailTemplateImage.TYPE = IMAGE_TYPE;
    EmailTemplateImage.TYPES = Object.values(IMAGE_TYPE);

    EmailTemplateImage.attributes = {
        base: ['imageId', 'emailTemplateId', 'type', 'key', 'location', 'size', 'createdBy'],
    };

    EmailTemplateImage.include = {};

    EmailTemplateImage.associate = ({}) => {};

    return EmailTemplateImage;
};
