const tableName = 'models';

const up = async (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
        modelId: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            field: 'model_id',
        },
        name: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'name',
        },
        bedrooms: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            field: 'bedrooms',
        },
        den: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'den',
        },
        bathrooms: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            field: 'bathrooms',
        },
        interiorSqFt: {
            type: Sequelize.DataTypes.FLOAT,
            allowNull: true,
            field: 'interior_sq_ft',
        },
        exteriorSqFt: {
            type: Sequelize.DataTypes.FLOAT,
            allowNull: true,
            field: 'exterior_sq_ft',
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
