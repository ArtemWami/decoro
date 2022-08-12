const tableName = 'buildings';

const up = async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await Promise.all([
            queryInterface.addColumn(tableName, 'campaign_started_at', {
                type: Sequelize.DataTypes.DATE,
                allowNull: true,
            }),
            queryInterface.addColumn(tableName, 'campaign_ended_at', {
                type: Sequelize.DataTypes.DATE,
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
        queryInterface.removeColumn(tableName, 'campaign_started_at'),
        queryInterface.removeColumn(tableName, 'campaign_ended_at'),
    ]);
};

module.exports = {
    up,
    down,
};
