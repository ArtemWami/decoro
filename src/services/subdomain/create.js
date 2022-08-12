const { Subdomain } = require('../../../models');

const createSubdomain = ({ name }) => {
    return Subdomain.create({ name });
}
module.exports = { createSubdomain };
