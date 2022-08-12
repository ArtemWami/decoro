module.exports = (sequelize, DataTypes) => {
    const IMAGE_TYPE = {
        FINISH_TYPE_PALETTE_IMG: 'FINISH_TYPE_PALETTE_IMG',
    };

    const FinishTypePaletteImage = sequelize.define(
        'FinishTypePaletteImage',
        {
            imageId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'image_id',
            },
            finishTypeId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'finish_type_id',
            },
            paletteId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'palette_id',
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
            tableName: 'finish_types_palettes_images',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    FinishTypePaletteImage.TYPE = IMAGE_TYPE;
    FinishTypePaletteImage.TYPES = Object.values(IMAGE_TYPE);

    FinishTypePaletteImage.attributes = {
        base: [
            'imageId',
            'finishTypeId',
            'paletteId',
            'type',
            'key',
            'location',
            'size',
            'createdBy',
        ],
    };

    FinishTypePaletteImage.include = {
        base: (include = []) => {
            return {
                model: FinishTypePaletteImage,
                as: 'images',
                required: false,
                separate: true,
                order: [['image_id', 'DESC']],
                attributes: FinishTypePaletteImage.attributes.base,
                include,
            };
        },
    };

    FinishTypePaletteImage.associate = ({}) => {};

    return FinishTypePaletteImage;
};
