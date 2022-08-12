const tableName = 'finish_types_palettes';

const up = async (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
        finishTypeId: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            field: 'finish_type_id',
        },
        paletteId: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            field: 'palette_id',
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
