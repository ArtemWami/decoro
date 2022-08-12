const extractDomainName = (domainName, level = 2) => domainName.split('.').slice(-level).join('.');
const extractSubdomainName = (origin) => {
    if (!origin) {
        return null;
    }

    let hostname = origin.replace(/^https?:\/\//, '');
    hostname = hostname.replace(/:\d{1,5}$/, '');
    const domainName = extractDomainName(hostname);
    return hostname.replace(`.${domainName}`, '');
};

module.exports = {
    extractDomainName,
    extractSubdomainName,
};
