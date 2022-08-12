const tableName = 'email_template_logs';

const up = async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await Promise.all([
            queryInterface.addColumn(tableName, 'from', {
                type: Sequelize.DataTypes.TEXT,
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
    await Promise.all([queryInterface.removeColumn(tableName, 'from')]);
};

module.exports = {
    up,
    down,
};
