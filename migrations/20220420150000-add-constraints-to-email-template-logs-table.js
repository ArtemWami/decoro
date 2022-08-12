const tableName = 'email_template_logs';

const up = async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await Promise.all([
            queryInterface.addConstraint(tableName, {
                transaction,
                fields: ['email_template_id'],
                type: 'foreign key',
                name: `fkey_${tableName}_email_template_id`,
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    table: 'email_templates',
                    field: 'email_template_id',
                },
            }),
            queryInterface.addConstraint(tableName, {
                transaction,
                fields: ['user_id'],
                type: 'foreign key',
                name: `fkey_${tableName}_user_id`,
                onDelete: 'set null',
                onUpdate: 'cascade',
                references: {
                    table: 'users',
                    field: 'user_id',
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
            queryInterface.removeConstraint(tableName, `fkey_${tableName}_email_template_id`, {
                transaction,
            }),
            queryInterface.removeConstraint(tableName, `fkey_${tableName}_user_id`, {
                transaction,
            }),
            queryInterface.removeConstraint(tableName, `fkey_${tableName}_company_id`, {
                transaction,
            }),
            queryInterface.removeConstraint(tableName, `fkey_${tableName}_subdomain_id`, {
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
