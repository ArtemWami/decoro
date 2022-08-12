const tableName = 'companies';

const up = async (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
        companyId: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            field: 'company_id',
        },
        companyName: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'company_name',
        },
        email: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'email',
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
        country: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'country',
        },
        phone: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'phone',
        },
        status: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'status',
        },
        primaryColor: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'primary_color',
        },
        textColor: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'text_color',
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
