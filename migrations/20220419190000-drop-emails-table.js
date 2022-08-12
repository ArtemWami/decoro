const tableName = 'emails';

const up = async (queryInterface) => {
    return queryInterface.dropTable(tableName);
};

const down = async () => {
    console.warn(`DROP TABLE ${tableName} can not be undone`);
};

module.exports = {
    up,
    down,
};
