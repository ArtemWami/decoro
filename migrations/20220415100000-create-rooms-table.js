const tableName = 'rooms';

const up = async (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
        roomId: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            field: 'room_id',
        },
        name: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'name',
        },
        area: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'area',
        },
        parentId: {
            type: Sequelize.DataTypes.UUID,
            allowNull: true,
            field: 'parent_id',
        },
        orderId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'order_id',
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
