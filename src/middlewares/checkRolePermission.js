const { ForbiddenError } = require('../errors');

const checkRolePermissions = (rolePermissions = []) => {
    if (!Array.isArray(rolePermissions)) {
        throw new Error('Invalid role permissions argument');
    }

    return (req, res, next) => {
        const { role } = req.state.user;
        if (!rolePermissions.includes(role)) {
            throw new ForbiddenError({ message: 'permission is not allowed' });
        }
        return next();
    };
};

module.exports = { checkRolePermissions };
