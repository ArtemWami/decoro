const tableName = 'finish_types';

const up = async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await Promise.all([
            queryInterface.addConstraint(tableName, {
                transaction,
                fields: ['options_id'],
                type: 'foreign key',
                name: `fkey_${tableName}_options_id`,
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    table: 'options',
                    field: 'options_id',
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
            queryInterface.addConstraint(tableName, {
                transaction,
                fields: ['company_id'],
                type: 'foreign key',
                name: `fkey_${tableName}_company_id`,
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    table: 'companies',
                    field: 'company_id',
                },
            }),
            queryInterface.addConstraint(tableName, {
                transaction,
                fields: ['subdomain_id'],
                type: 'foreign key',
                name: `fkey_${tableName}_subdomain_id`,
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    table: 'subdomains',
                    field: 'subdomain_id',
                },
            }),
            queryInterface.addConstraint(tableName, {
                transaction,
                fields: ['created_by'],
                type: 'foreign key',
                name: `fkey_${tableName}_created_by`,
                onDelete: 'set null',
                onUpdate: 'cascade',
                references: {
                    table: 'users',
                    field: 'user_id',
                },
            }),
            queryInterface.addConstraint(tableName, {
                transaction,
                fields: ['updated_by'],
                type: 'foreign key',
                name: `fkey_${tableName}_updated_by`,
                onDelete: 'set null',
                onUpdate: 'cascade',
                references: {
                    table: 'users',
                    field: 'user_id',
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
            queryInterface.removeConstraint(tableName, `fkey_${tableName}_options_id`, {
                transaction,
            }),
            queryInterface.removeConstraint(tableName, `fkey_${tableName}_building_id`, {
                transaction,
            }),
            queryInterface.removeConstraint(tableName, `fkey_${tableName}_company_id`, {
                transaction,
            }),
            queryInterface.removeConstraint(tableName, `fkey_${tableName}_subdomain_id`, {
                transaction,
            }),
            queryInterface.removeConstraint(tableName, `fkey_${tableName}_created_by`, {
                transaction,
            }),
            queryInterface.removeConstraint(tableName, `fkey_${tableName}_updated_by`, {
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
