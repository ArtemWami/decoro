module.exports = (sequelize, DataTypes) => {
    const UNIT_TYPES = {
        LOWER_LEVEL_UNITS: 'LOWER_LEVEL_UNITS',
        LOWER_PENTHOUSES: 'LOWER_PENTHOUSES',
        UPPER_PENTHOUSES: 'UPPER_PENTHOUSES',
        TOWNHOUSES: 'TOWNHOUSES',
    };

    const PriceUnitType = sequelize.define(
        'PriceUnitType',
        {
            priceId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
                field: 'price_id',
            },
            unitType: {
                type: DataTypes.TEXT,
                primaryKey: true,
                allowNull: false,
                field: 'unit_type',
                validate: { isIn: [Object.values(UNIT_TYPES)] },
            },
            subdomainId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'subdomain_id',
            },
            companyId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'company_id',
            },
            buildingId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'building_id',
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
            tableName: 'prices_unit_types',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    PriceUnitType.attributes = {};

    PriceUnitType.include = {};

    PriceUnitType.associate = ({}) => {};

    return PriceUnitType;
};
