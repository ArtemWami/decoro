const { NotFoundError, ConflictError } = require('../errors');
const { User } = require('../../models');

/**
 * isExist:
 * true - is element should be exist,
 * false - is element should not be exist
 * */
const checkUser = {
  byEmail: ({ required = true, isExist = true }) => async (req, res, next) => {
      if (!req.state) req.state = {};
      const email =
          req.params.email
          || req.query.email
          || req.body.email
          || req.params.login
          || req.query.login
          || req.body.login;

      if (required && !email) return next(new NotFoundError({ message: `EMAIL PARAM IS NOT FOUND` }));
      if (email) {
        const user = await User.findOne({ where: { email } });
        if (!user && isExist === true) return next(new NotFoundError({ message: `USER WITH EMAIL ${email} IS NOT EXIST` }));
        if (user && isExist === false) return next(new ConflictError({ message: `USER WITH EMAIL ${email} IS EXIST` }));
        req.state.user = user;
      }
      return next();
    }
};

module.exports = { checkUser };
