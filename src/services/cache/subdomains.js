const buildKey = require('./buildKey');
const client = require('./client');

const KEY_NAMESPACE = 'subdomains';

const buildNamespaceKey = (...args) => buildKey(KEY_NAMESPACE, ...args);
const getFindOneByNameKey = ({ name }) => buildNamespaceKey(name, 'findOneByName');
const getFindOneBySubdomainIdKey = ({ subdomainId }) =>
    buildNamespaceKey(subdomainId, 'findOneBySubdomainId');

const resetSubdomainsCache = (data) => {
    if (!data) {
        return;
    }

    const { name, subdomainId } = data;
    return client.del([getFindOneByNameKey({ name }), getFindOneBySubdomainIdKey({ subdomainId })]);
};

module.exports = {
    getFindOneByNameKey,
    getFindOneBySubdomainIdKey,
    resetSubdomainsCache,
};
