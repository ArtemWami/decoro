module.exports = (sequelize, DataTypes) => {
    const IMAGE_TYPE = {
        FLOOR_PLANS: 'FLOOR_PLANS',
        PHOTOS_RENDERS: 'PHOTOS_RENDERS',
    };

    const ModelImage = sequelize.define(
        'ModelImage',
        {
            imageId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'image_id',
            },
            modelId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'model_id',
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
            buildingId: {
                type: DataTypes.UUID,
                allowNull: false,
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
            tableName: 'model_images',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    ModelImage.TYPE = IMAGE_TYPE;
    ModelImage.TYPES = Object.values(IMAGE_TYPE);

    ModelImage.attributes = {
        base: ['imageId', 'modelId', 'type', 'key', 'location', 'size', 'createdBy'],
    };

    ModelImage.include = {
        base: (include = []) => {
            return {
                model: ModelImage,
                as: 'images',
                required: false,
                separate: true,
                order: [['image_id', 'DESC']],
                attributes: ModelImage.attributes.base,
                include,
            };
        },
    };

    ModelImage.associate = ({}) => {};

    return ModelImage;
};
