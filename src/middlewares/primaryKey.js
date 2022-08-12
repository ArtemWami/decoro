const { NotFoundError, ConflictError } = require('../errors');

const check = (req, key, Model) => {
  const id = req.params[key] || req.query[key] || req.body[key];
  if (!id) return undefined;
  return Model.findByPk(id);
};

const checkByPk = {
  exist: (Model, key, stateName, required = true) => async (req, res, next) => {
    const id = req.params[key] || req.query[key] || req.body[key];

    if (required && !id) return next(new NotFoundError({ message: `${key} IS NOT FOUND` }));
    if (+id === 0) return next(new NotFoundError({ message: `${key} INVALID VALUE` }));
    if (id) {
      const obj = await Model.findByPk(id);
      if (!obj) return next(new NotFoundError({ message: `${stateName} IS NOT EXIST` }));
      req.state[stateName] = obj;
    }
    return next();
  },
  notExist: (Model, key) => async (req, res, next) => {
    const obj = await check(req, key, Model);
    if (obj) return next(new ConflictError({ message: `ELEMENT ${key} IS EXIST` }));
    return next();
  },
};

module.exports = { checkByPk };
