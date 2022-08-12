const tableName = 'email_template_logs';

const up = async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await Promise.all([
            queryInterface.addColumn(tableName, 'unit_id', {
                type: Sequelize.DataTypes.UUID,
                allowNull: true,
            }),
            queryInterface.addColumn(tableName, 'building_id', {
                type: Sequelize.DataTypes.UUID,
                allowNull: true,
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
        queryInterface.removeColumn(tableName, 'unit_id'),
        queryInterface.removeColumn(tableName, 'building_id'),
    ]);
};

module.exports = {
    up,
    down,
};
