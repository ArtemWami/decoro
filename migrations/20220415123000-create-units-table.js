const tableName = 'units';

const up = async (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
        unitId: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            field: 'unit_id',
        },
        modelId: {
            type: Sequelize.DataTypes.UUID,
            allowNull: true,
            field: 'model_id',
        },
        unitNumber: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            field: 'unit_number',
        },
        status: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'status',
        },
        type: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'type',
        },
        cash: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'cash',
        },
        recipientId: {
            type: Sequelize.DataTypes.UUID,
            allowNull: true,
            field: 'recipient_id',
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
