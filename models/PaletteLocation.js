module.exports = (sequelize, DataTypes) => {
    const PaletteLocation = sequelize.define(
        'PaletteLocation',
        {
            paletteLocationId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'palette_location_id',
            },
            paletteId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'palette_id',
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'name',
                validate: { len: [0, 255] },
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
            tableName: 'palette_locations',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    PaletteLocation.attributes = {
        base: ['paletteLocationId', 'paletteId', 'name'],
    };

    PaletteLocation.include = {
        base: (include = []) => {
            return {
                model: PaletteLocation,
                as: 'paletteLocation',
                required: false,
                separate: true,
                order: [['paletteLocationId', 'ASC']],
                attributes: PaletteLocation.attributes.base,
                include,
            };
        },
    };

    PaletteLocation.associate = ({ PaletteLocationImage }) => {
        PaletteLocation.hasMany(PaletteLocationImage, {
            foreignKey: 'paletteLocationId',
            sourceKey: 'paletteLocationId',
            as: 'images',
        });
    };

    PaletteLocation.DEFAULT_NAMES = {
        Floor: 'Floor',
        Countertop: 'Countertop',
        Tile: 'Tile',
    };

    return PaletteLocation;
};
