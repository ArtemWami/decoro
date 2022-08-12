const tableName = 'email_template_logs';

const up = async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await Promise.all([
            queryInterface.addConstraint(tableName, {
                transaction,
                fields: ['unit_id'],
                type: 'foreign key',
                name: `fkey_${tableName}_unit_id`,
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    table: 'units',
                    field: 'unit_id',
                },
            }),
            queryInterface.addConstraint(tableName, {
                transaction,
                fields: ['building_id'],
                type: 'foreign key',
                name: `fkey_${tableName}_building_id`,
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    table: 'buildings',
                    field: 'building_id',
                },
            }),
        ]);

        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
};

const down = async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await Promise.all([
            queryInterface.removeConstraint(tableName, `fkey_${tableName}_unit_id`, {
                transaction,
            }),
            queryInterface.removeConstraint(tableName, `fkey_${tableName}_building_id`, {
                transaction,
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
