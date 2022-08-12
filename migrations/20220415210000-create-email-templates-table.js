const tableName = 'email_templates';

const up = async (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            field: 'email_template_id',
        },
        subject: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'subject',
        },
        deliveryStage: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'delivery_stage',
        },
        daysDelay: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            field: 'days_delay',
        },
        template: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'template',
        },
        name: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'name',
        },
        status: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            field: 'status',
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
