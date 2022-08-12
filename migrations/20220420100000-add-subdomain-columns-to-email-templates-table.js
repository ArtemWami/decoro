const tableName = 'email_templates';

const up = async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await Promise.all([
            queryInterface.addColumn(tableName, 'from', {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true,
            }),
            queryInterface.addColumn(tableName, 'is_enabled', {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            }),
            queryInterface.addColumn(tableName, 'order_id', {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            }),
            queryInterface.addColumn(tableName, 'parent_email_template_id', {
                type: Sequelize.DataTypes.UUID,
                allowNull: true,
            }),
            queryInterface.addColumn(tableName, 'company_id', {
                type: Sequelize.UUID,
                allowNull: false,
            }),
            queryInterface.addColumn(tableName, 'subdomain_id', {
                type: Sequelize.UUID,
                allowNull: false,
            }),
        ]);

        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
};

const down = async (queryInterface) => {
    await Promise.all([
        queryInterface.removeColumn(tableName, 'from'),
        queryInterface.removeColumn(tableName, 'is_enabled'),
        queryInterface.removeColumn(tableName, 'parent_email_template_id'),
        queryInterface.removeColumn(tableName, 'company_id'),
        queryInterface.removeColumn(tableName, 'subdomain_id'),
    ]);
};

module.exports = {
    up,
    down,
};
