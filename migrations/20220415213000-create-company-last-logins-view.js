const viewName = 'company_last_logins_view';
const viewSql = `
CREATE OR REPLACE VIEW public.${viewName} AS
    SELECT
      company_id,
      MAX(last_login) as max_last_login
    FROM users
    GROUP BY company_id
`;

const up = (queryInterface) => {
    return queryInterface.sequelize.query(viewSql);
};

const down = (queryInterface) => {
    return queryInterface.sequelize.query(`DROP VIEW ${viewName}`);
};

module.exports = {
    up,
    down,
};
