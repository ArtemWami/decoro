const tableName = 'buildings_rooms';

const up = async (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
        buildingId: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            field: 'building_id',
        },
        roomId: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            field: 'room_id',
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
