const tableName = 'forgot_passwords';

const up = async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await Promise.all([
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
        queryInterface.removeColumn(tableName, 'company_id'),
        queryInterface.removeColumn(tableName, 'subdomain_id'),
    ]);
};

module.exports = {
    up,
    down,
};
