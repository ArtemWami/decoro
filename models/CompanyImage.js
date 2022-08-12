module.exports = (sequelize, DataTypes) => {
    const IMAGE_TYPE = {
        LOGO: 'LOGO',
        ICON: 'ICON',
        PAGE: 'PAGE',
    };

    const CompanyImage = sequelize.define(
        'CompanyImage',
        {
            imageId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'image_id',
            },
            companyId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'company_id',
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
            tableName: 'company_images',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    CompanyImage.TYPE = IMAGE_TYPE;
    CompanyImage.TYPES = Object.values(IMAGE_TYPE);

    CompanyImage.attributes = {
        base: ['imageId', 'companyId', 'type', 'key', 'location', 'size', 'createdBy'],
    };

    CompanyImage.include = {
        base: (include = []) => {
            return {
                model: CompanyImage,
                as: 'images',
                required: false,
                separate: true,
                order: [['image_id', 'DESC']],
                attributes: CompanyImage.attributes.base,
                include,
            };
        },
    };

    CompanyImage.associate = ({}) => {};

    return CompanyImage;
};
