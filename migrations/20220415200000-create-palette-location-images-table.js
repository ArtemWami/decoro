const tableName = 'palette_location_images';

const up = async (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
        imageId: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            field: 'image_id',
        },
        paletteLocationId: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            field: 'palette_location_id',
        },
        type: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'type',
        },
        key: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'key',
        },
        location: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'location',
        },
        size: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            field: 'size',
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
