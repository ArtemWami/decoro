const tableName = 'units_users';

const up = async (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
        unitId: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            field: 'unit_id',
        },
        userId: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            field: 'user_id',
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
