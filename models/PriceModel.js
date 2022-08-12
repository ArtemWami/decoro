module.exports = (sequelize, DataTypes) => {
    const PriceModel = sequelize.define(
        'PriceModel',
        {
            priceId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                field: 'price_id',
            },
            modelId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                field: 'model_id',
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
            tableName: 'prices_models',
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
        }
    );

    PriceModel.attributes = {};

    PriceModel.include = {};

    PriceModel.associate = ({}) => {};

    return PriceModel;
};
