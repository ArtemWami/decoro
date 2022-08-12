const { NotFoundError, ConflictError } = require('../errors');
const { Subdomain } = require('../../models');

/**
 * isExist:
 * true - is element should be exist,
 * false - is element should not be exist
 * */
const checkSubdomain = {
  bySubdomainName: ({ required = true, isExist = true }) => async (req, res, next) => {
      if (!req.state) req.state = {};
      const subdomainName =
          req.params.subdomainName
          || req.query.subdomainName
          || req.body.subdomainName;

      if (required && !subdomainName) return next(new NotFoundError({ message: `subdomainName PARAM IS NOT FOUND` }));
      if (subdomainName) {
        const subdomain = await Subdomain.findOne({ where: { name: subdomainName } });
        if (!subdomain && isExist === true) return next(new NotFoundError({ message: `SUBDOMAIN WITH NAME ${subdomainName} IS NOT EXIST` }));
        if (subdomain && isExist === false) return next(new ConflictError({ message: `SUBDOMAIN WITH NAME ${subdomainName} IS EXIST` }));
        req.state.subdomain = subdomain;
      }
      return next();
    }
};

module.exports = { checkSubdomain };
