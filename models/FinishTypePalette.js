const { Op, col } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const FinishTypePalette = sequelize.define(
        'FinishTypePalette',
        {
            finishTypeId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                field: 'finish_type_id',
            },
            paletteId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                field: 'palette_id',
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
            tableName: 'finish_types_palettes',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    FinishTypePalette.attributes = {
        base: [],
    };

    FinishTypePalette.associate = ({ Palette, FinishTypePaletteImage }) => {
        FinishTypePalette.belongsTo(Palette, { foreignKey: 'paletteId', as: 'palette' });
        FinishTypePalette.hasMany(FinishTypePaletteImage, {
            foreignKey: 'finishTypeId',
            sourceKey: 'finishTypeId',
            scope: { palette_id: { [Op.eq]: col('finishTypes->finishTypePalettes.palette_id') } },
            as: 'images',
        });
    };

    return FinishTypePalette;
};
