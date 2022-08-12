const { priceFieldAccessors } = require('../src/helpers/model');

module.exports = (sequelize, DataTypes) => {
    const Price = sequelize.define(
        'Price',
        {
            priceId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'price_id',
            },
            finishTypeId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'finish_type_id',
            },
            contractorPrice: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'contractor_price',
                ...priceFieldAccessors('contractorPrice'),
            },
            lowerLevelUnitsPrice: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'lower_level_unit_price',
                ...priceFieldAccessors('lowerLevelUnitsPrice'),
            },
            lowerPenthousesPrice: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'lower_penthouses_price',
                ...priceFieldAccessors('lowerPenthousesPrice'),
            },
            upperPenthousesPrice: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'upper_penthouses_price',
                ...priceFieldAccessors('upperPenthousesPrice'),
            },
            townhousesPrice: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'townhouses_price',
                ...priceFieldAccessors('townhousesPrice'),
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
            tableName: 'prices',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    Price.attributes = {};

    Price.include = {};

    Price.associate = ({ Model, PriceModel, PriceUnitType }) => {
        Price.hasMany(PriceModel, {
            foreignKey: 'priceId',
            sourceKey: 'priceId',
            as: 'priceModels',
        });

        Price.hasMany(PriceUnitType, {
            foreignKey: 'priceId',
            sourceKey: 'priceId',
            as: 'priceUnitTypes',
        });

        Price.belongsToMany(Model, {
            through: PriceModel,
            foreignKey: 'priceId',
            otherKey: 'modelId',
            as: 'models',
        });
    };

    return Price;
};
