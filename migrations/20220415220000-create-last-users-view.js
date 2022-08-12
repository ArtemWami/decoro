const viewName = 'last_users_view';
const viewSql = `
CREATE OR REPLACE VIEW public.${viewName} AS
    SELECT
      users.company_id as company_id,
      subdomain_id,
      last_login,
      user_id,
      first_name,
      last_name,
      email,
      email_verified,
      password,
      role,
      phone,
      language_code,
      created_at,
      updated_at,
      deleted_at,
      job_title,
      status
    FROM users
    INNER JOIN company_last_logins_view
      ON users.company_id = company_last_logins_view.company_id
        AND users.last_login = company_last_logins_view.max_last_login
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
