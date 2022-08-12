module.exports = (sequelize, DataTypes) => {
    const Palette = sequelize.define(
        'Palette',
        {
            paletteId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'palette_id',
            },
            buildingId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'building_id',
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'name',
                validate: { len: [0, 255] },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'description',
                validate: { len: [0, 1000] },
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
            tableName: 'palettes',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    Palette.attributes = {
        base: ['paletteId', 'name', 'description', 'buildingId'],
    };

    Palette.include = {
        base: (include = []) => {
            return {
                model: Palette,
                as: 'palette',
                required: false,
                separate: true,
                order: [['paletteId', 'ASC']],
                attributes: Palette.attributes.base,
                include,
            };
        },
    };

    Palette.associate = ({ PaletteLocation }) => {
        Palette.hasMany(PaletteLocation, {
            foreignKey: 'paletteId',
            sourceKey: 'paletteId',
            as: 'paletteLocation',
        });
    };

    return Palette;
};
