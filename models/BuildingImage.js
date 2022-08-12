module.exports = (sequelize, DataTypes) => {
    const IMAGE_TYPE = {
        BUILDING_IMG: 'BUILDING_IMG',
    };

    const BuildingImage = sequelize.define(
        'BuildingImage',
        {
            imageId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'image_id',
            },
            buildingId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'building_id',
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
            tableName: 'building_images',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    BuildingImage.TYPE = IMAGE_TYPE;
    BuildingImage.TYPES = Object.values(IMAGE_TYPE);

    BuildingImage.attributes = {
        base: ['imageId', 'buildingId', 'type', 'key', 'location', 'size', 'createdBy'],
    };

    BuildingImage.include = {
        base: (include = []) => {
            return {
                model: BuildingImage,
                as: 'images',
                required: false,
                separate: true,
                order: [['image_id', 'DESC']],
                attributes: BuildingImage.attributes.base,
                include,
            };
        },
    };

    BuildingImage.associate = ({}) => {};

    return BuildingImage;
};
