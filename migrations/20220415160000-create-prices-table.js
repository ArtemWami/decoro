const tableName = 'prices';

const up = async (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
        priceId: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            field: 'price_id',
        },
        finishTypeId: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            field: 'finish_type_id',
        },
        contractorPrice: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            field: 'contractor_price',
        },
        lowerLevelUnitsPrice: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            field: 'lower_level_unit_price',
        },
        lowerPenthousesPrice: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            field: 'lower_penthouses_price',
        },
        upperPenthousesPrice: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            field: 'upper_penthouses_price',
        },
        townhousesPrice: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            field: 'townhouses_price',
        },
        buildingId: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            field: 'building_id',
        },
        companyId: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            field: 'company_id',
        },
        subdomainId: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            field: 'subdomain_id',
        },
        createdBy: {
            type: Sequelize.DataTypes.UUID,
            allowNull: true,
            field: 'created_by',
        },
        updatedBy: {
            type: Sequelize.DataTypes.UUID,
            allowNull: true,
            field: 'updated_by',
        },
        createdAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            field: 'created_at',
        },
        updatedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            field: 'updated_at',
        },
        deletedAt: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            field: 'deleted_at',
        },
    });
};

const down = async (queryInterface) => {
    return queryInterface.dropTable(tableName);
};

module.exports = {
    up,
    down,
};
