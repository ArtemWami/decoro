const tableName = 'companies';

const up = async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await Promise.all([
            queryInterface.changeColumn(tableName, 'email', {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true,
            }),
            queryInterface.changeColumn(tableName, 'status', {
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

const down = async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await Promise.all([
            queryInterface.changeColumn(tableName, 'email', {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false,
            }),
            queryInterface.changeColumn(tableName, 'status', {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true,
            }),
        ]);

        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
};

module.exports = {
    up,
    down,
};
