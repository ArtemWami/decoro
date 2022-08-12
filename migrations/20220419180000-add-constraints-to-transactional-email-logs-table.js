const tableName = 'transactional_email_logs';

const up = async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
        await Promise.all([
            queryInterface.addConstraint(tableName, {
                transaction,
                fields: ['transactional_email_template_id'],
                type: 'foreign key',
                name: `fkey_${tableName}_transactional_email_template_id`,
                onDelete: 'cascade',
                onUpdate: 'cascade',
                references: {
                    table: 'transactional_email_templates',
                    field: 'transactional_email_template_id',
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
            queryInterface.removeConstraint(tableName, `fkey_${tableName}_transactional_email_template_id`, {
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
