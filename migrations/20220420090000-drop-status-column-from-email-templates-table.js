const tableName = 'email_templates';

const up = async (queryInterface) => {
    return queryInterface.removeColumn(tableName, 'status');
};

const down = async () => {
    console.warn(`DROP COLUMN status FROM ${tableName} can not be undone`);
};

module.exports = {
    up,
    down,
};
