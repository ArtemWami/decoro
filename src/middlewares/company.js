const { NotFoundError, ConflictError } = require('../errors');
const { Company } = require('../../models');

/**
 * isExist:
 * true - is element should be exist,
 * false - is element should not be exist
 * */
const checkCompany = {
  byEmail: ({ required = true, isExist = true }) => async (req, res, next) => {
      if (!req.state) req.state = {};
      const email =
          req.params.email
          || req.query.email
          || req.body.email;

      if (required && !email) return next(new NotFoundError({ message: `EMAIL PARAM IS NOT FOUND` }));
      if (email) {
        const company = await Company.findOne({ where: { email } });
        if (!company && isExist === true) return next(new NotFoundError({ message: `COMPANY WITH EMAIL ${email} IS NOT EXIST` }));
        if (company && isExist === false) return next(new ConflictError({ message: `COMPANY WITH EMAIL ${email} IS EXIST` }));
        req.state.company = company;
      }
      return next();
    }
};

module.exports = { checkCompany };
