const tableName = 'buildings';

const up = async (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
        buildingId: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            field: 'building_id',
        },
        name: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'name',
        },
        address: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'address',
        },
        city: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'city',
        },
        province: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'province',
        },
        postalCode: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'postal_code',
        },
        status: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'status',
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
