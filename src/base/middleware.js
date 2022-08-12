const wrap = (fn) => (req, res, next) => fn(req, res).then(next).catch(next);

module.exports = {
    wrap,
};
