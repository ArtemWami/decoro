const { Company } = require('../../../models');

const createCompany = ({
    subdomainId,
    companyName,
    address,
    city,
    province,
    postalCode,
    country,
    phone,
    email,
}) =>
    Company.create({
        subdomainId,
        companyName,
        address,
        city,
        province,
        postalCode,
        country,
        phone,
        email,
    });

module.exports = { createCompany };
