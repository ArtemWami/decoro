const buildKey = require('./buildKey');
const client = require('./client');

const KEY_NAMESPACE = 'companies';

const buildNamespaceKey = (...args) => buildKey(KEY_NAMESPACE, ...args);
const getFindOneByCompanyIdKey = ({ companyId }) =>
    buildNamespaceKey(companyId, 'findOneByCompanyId');

const getFindOneBySubdomainIdKey = ({ subdomainId }) =>
    buildNamespaceKey(subdomainId, 'findOneBySubdomainId');

const resetCompaniesCache = (data) => {
    if (!data) {
        return;
    }

    const { companyId, subdomainId } = data;
    return client.del([
        getFindOneByCompanyIdKey({ companyId }),
        getFindOneBySubdomainIdKey({ subdomainId }),
    ]);
};

module.exports = {
    getFindOneByCompanyIdKey,
    getFindOneBySubdomainIdKey,
    resetCompaniesCache,
};
