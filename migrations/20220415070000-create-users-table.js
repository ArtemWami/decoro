const tableName = 'users';

const up = async (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
        userId: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            field: 'user_id',
        },
        email: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'email',
        },
        emailVerified: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'email_verified',
        },
        role: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'role',
        },
        firstName: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'first_name',
        },
        lastName: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'last_name',
        },
        phone: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'phone',
        },
        jobTitle: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'job_title',
        },
        status: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            defaultValue: 'PENDING',
            field: 'status',
        },
        password: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'password',
        },
        lastLogin: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            field: 'last_login',
        },
        languageCode: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'language_code',
        },
        subdomainId: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            field: 'subdomain_id',
        },
        companyId: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            field: 'company_id',
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
