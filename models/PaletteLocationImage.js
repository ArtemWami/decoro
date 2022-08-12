module.exports = (sequelize, DataTypes) => {
    const IMAGE_TYPE = {
        COLOR_PALETTE_IMG: 'COLOR_PALETTE_IMG',
    };

    const PaletteLocationImage = sequelize.define(
        'PaletteLocationImage',
        {
            imageId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'image_id',
            },
            paletteLocationId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'palette_location_id',
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
            tableName: 'palette_location_images',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    PaletteLocationImage.TYPE = IMAGE_TYPE;
    PaletteLocationImage.TYPES = Object.values(IMAGE_TYPE);

    PaletteLocationImage.attributes = {
        base: ['imageId', 'paletteLocationId', 'type', 'key', 'location', 'size', 'createdBy'],
    };

    PaletteLocationImage.include = {
        base: (include = []) => {
            return {
                model: PaletteLocationImage,
                as: 'images',
                required: false,
                separate: true,
                order: [['image_id', 'DESC']],
                attributes: PaletteLocationImage.attributes.base,
                include,
            };
        },
    };

    PaletteLocationImage.associate = ({}) => {};

    return PaletteLocationImage;
};
