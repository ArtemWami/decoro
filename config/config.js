require('../config-env');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_PORT, DB_HOST, DB_DIALECT = 'postgres' } = process.env;

module.exports = {
    migrationStorageTableName: 'sequelize_meta',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    dialect: DB_DIALECT,
    logging: false,
};
