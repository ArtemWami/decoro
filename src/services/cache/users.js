const buildKey = require('./buildKey');
const client = require('./client');

const KEY_NAMESPACE = 'users';

const buildNamespaceKey = (...args) => buildKey(KEY_NAMESPACE, ...args);
const getFindOneByUserIdKey = ({ userId }) => buildNamespaceKey(userId, 'findOneByUserId');
const resetUsersCache = ({ userId }) => client.del([getFindOneByUserIdKey({ userId })]);

module.exports = {
    getFindOneByUserIdKey,
    resetUsersCache,
};
