const { User } = require('../../models');

const apiVersionByRole = {
    [User.ROLE.GUEST]: 'v1.0',
    [User.ROLE.MASTER]: 'v1.1',
    [User.ROLE.ADMIN]: 'v1.2',
    [User.ROLE.ADMIN_MANAGER]: 'v1.3',
    [User.ROLE.TEAM_MEMBER]: 'v1.4',
    [User.ROLE.OWNER]: 'v1.5',
};

module.exports = {
    apiVersionByRole,
};
