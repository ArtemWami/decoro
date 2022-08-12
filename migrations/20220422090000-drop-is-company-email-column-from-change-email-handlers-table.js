const tableName = 'change_email_handlers';

const up = async (queryInterface) => {
    return queryInterface.removeColumn(tableName, 'is_company_email');
};

const down = async () => {
    console.warn(`DROP COLUMN is_company_email FROM ${tableName} can not be undone`);
};

module.exports = {
    up,
    down,
};
