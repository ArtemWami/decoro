const tableName = 'transactional_email_templates';

const up = async (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
        transactionalEmailTemplateId: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            field: 'transactional_email_template_id',
        },
        type: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'type',
            unique: true,
        },
        description: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'description',
        },
        subject: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'subject',
            validate: { len: [0, 255] },
        },
        text: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'text',
            validate: { len: [0, 10000] },
        },
        html: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            field: 'html',
            validate: { len: [0, 10000] },
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
